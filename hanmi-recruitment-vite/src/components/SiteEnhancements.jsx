import { useEffect, useState } from 'react'

const scriptPaths = [
  'hanmi-eye-tracking/hanmi-eye-tracking/metadata.js',
  'hanmi-eye-tracking/hanmi-eye-tracking/player.js',
  'hanmi-reading-eye-tracking/metadata-v3.js',
  'hanmi-reading-eye-tracking/player-v3.js',
  'js/main.js',
  'js/smooth-scroll.js',
]

const scriptPromises = new Map()

function loadScript(path) {
  if (scriptPromises.has(path)) return scriptPromises.get(path)

  const script = document.createElement('script')
  script.src = `${import.meta.env.BASE_URL}${path}`
  script.async = false

  const promise = new Promise((resolve, reject) => {
    script.addEventListener('load', resolve, { once: true })
    script.addEventListener(
      'error',
      () => reject(new Error(`스크립트를 불러오지 못했습니다: ${path}`)),
      { once: true },
    )
  })

  scriptPromises.set(path, promise)
  document.body.append(script)
  return promise
}

function loadSiteScripts() {
  return scriptPaths.reduce(
    (sequence, path) => sequence.then(() => loadScript(path)),
    Promise.resolve(),
  )
}

function SiteEnhancements() {
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let active = true

    loadSiteScripts().catch((error) => {
      console.error('사이트 인터랙션 초기화에 실패했습니다.', error)
      if (active) {
        setLoadError('페이지 인터랙션 일부를 초기화하지 못했습니다. 새로고침해 주세요.')
      }
    })

    return () => {
      active = false
    }
  }, [])

  if (!loadError) return null

  return (
    <p className="site-runtime-error" role="alert">
      {loadError}
    </p>
  )
}

export default SiteEnhancements
