import { readFile, stat, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = path.resolve(
  process.env.HANMI_SOURCE_DIR ??
    path.join(projectRoot, '..', '한미그룹채용_리액트버전'),
)
const publicRoot = path.join(projectRoot, 'public')

const frameSets = [
  {
    source: path.join(
      sourceRoot,
      'hanmi-eye-tracking',
      'hanmi-eye-tracking',
      'assets',
    ),
    output: path.join(
      publicRoot,
      'hanmi-eye-tracking',
      'hanmi-eye-tracking',
      'assets',
    ),
    filePrefix: 'run_',
    count: 73,
    metadata: path.join(
      publicRoot,
      'hanmi-eye-tracking',
      'hanmi-eye-tracking',
      'metadata.js',
    ),
    metadataPattern: /("src"\s*:\s*"run_\{n\})\.png(")/,
  },
  {
    source: path.join(sourceRoot, 'hanmi-reading-eye-tracking', 'assets'),
    output: path.join(
      publicRoot,
      'hanmi-reading-eye-tracking',
      'assets',
    ),
    filePrefix: 'reading_glasses_',
    count: 50,
    metadata: path.join(publicRoot, 'hanmi-reading-eye-tracking', 'metadata-v3.js'),
    metadataPattern: /("src"\s*:\s*"reading_glasses_\{n\})\.png(")/,
  },
]

const jobs = []
for (const frameSet of frameSets) {
  for (let frame = 1; frame <= frameSet.count; frame += 1) {
    const name = `${frameSet.filePrefix}${frame}.png`
    const source = path.join(frameSet.source, name)
    const output = path.join(frameSet.output, name.replace(/\.png$/, '.webp'))
    try {
      await stat(source)
    } catch (error) {
      throw new Error(
        `Canvas 원본 프레임을 찾을 수 없습니다: ${source}. HANMI_SOURCE_DIR 환경 변수로 원본 폴더를 지정해 주세요.`,
        { cause: error },
      )
    }
    jobs.push({ source, output, publicPng: path.join(frameSet.output, name) })
  }
}

let nextJob = 0
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (nextJob < jobs.length) {
      const job = jobs[nextJob]
      nextJob += 1
      await sharp(job.source)
        .webp({ lossless: true, effort: 6 })
        .toFile(job.output)
    }
  }),
)

for (const frameSet of frameSets) {
  const contents = await readFile(frameSet.metadata, 'utf8')
  if (!contents.includes(`${frameSet.filePrefix}{n}.webp`)) {
    if (!frameSet.metadataPattern.test(contents)) {
      throw new Error(`Canvas metadata 형식이 예상과 다릅니다: ${frameSet.metadata}`)
    }
    await writeFile(
      frameSet.metadata,
      contents.replace(frameSet.metadataPattern, '$1.webp$2'),
      'utf8',
    )
  }
}

for (const job of jobs) {
  try {
    await unlink(job.publicPng)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}

const originalBytes = await jobs.reduce(async (sumPromise, job) => {
  const sum = await sumPromise
  return sum + (await stat(job.source)).size
}, Promise.resolve(0))
const webpBytes = await jobs.reduce(async (sumPromise, job) => {
  const sum = await sumPromise
  return sum + (await stat(job.output)).size
}, Promise.resolve(0))

console.log(
  `Converted ${jobs.length} Canvas frames losslessly: ${(originalBytes / 1024 / 1024).toFixed(2)} MB -> ${(webpBytes / 1024 / 1024).toFixed(2)} MB.`,
)
