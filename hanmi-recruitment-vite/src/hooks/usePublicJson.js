import { useEffect, useState } from 'react'

function usePublicJson(path, validate) {
  const [result, setResult] = useState({
    data: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${import.meta.env.BASE_URL}${path}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`데이터 요청 실패 (${response.status}): ${path}`)
        }
        return response.json()
      })
      .then((data) => {
        if (!validate(data)) {
          throw new Error(`데이터 형식이 올바르지 않습니다: ${path}`)
        }
        setResult({ data, error: null, loading: false })
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        console.error('페이지 데이터를 불러오지 못했습니다.', error)
        setResult({ data: null, error, loading: false })
      })

    return () => controller.abort()
  }, [path, validate])

  return result
}

export default usePublicJson
