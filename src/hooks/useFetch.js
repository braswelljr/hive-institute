import { useEffect, useState } from 'react'

export const useFetch = (url, options = {}) => {
  const [response, setResponse] = useState(null)

  useEffect(() => {
    ;async () => {
      try {
        setResponse(await (await fetch(url, options)).json())
      } catch (error) {
        console.error(error)
      }
    }
  }, [])

  return response
}
