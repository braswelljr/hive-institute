import { useEffect, useState, useRef } from 'react'

export const usePersistedState = (name, defaultValue) => {
  const [value, setValue] = useState(defaultValue)
  const nameRef = useRef(name)

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(name)
      if (storedValue !== null) setValue(storedValue)
      else localStorage.setItem(name, defaultValue)
    } catch {
      setValue(defaultValue)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(nameRef.current, value)
    } catch (error) {
      console.error(error)
    }
  }, [value])

  useEffect(() => {
    const lastName = nameRef.current
    if (name !== lastName) {
      try {
        localStorage.setItem(name, value)
        nameRef.current = name
        localStorage.removeItem(lastName)
      } catch (error) {
        console.error(error)
      }
    }
  }, [name])

  return [value, setValue]
}
