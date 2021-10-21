import { createContext, useState } from 'react'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicEffect'

export const AppContext = createContext()

const AppProvider = ({ children }) => {
  const appRef = 'ref/hive-institute' // application reference :id
  const [token, setToken] = useState()

  // watch token and log into local Storage
  useIsomorphicLayoutEffect(() => {
    const loadStorage = () => {
      // watch if storage is defined
      if (typeof Storage !== 'undefined') {
        // set storage item if not available
        if (
          localStorage.getItem(appRef) !== null ||
          localStorage.getItem(appRef) !== undefined
        ) {
          setToken(JSON.parse(localStorage.getItem(appRef)))
        }
      }
    }

    // set token on load
    // subscribe
    window.addEventListener('load', loadStorage)
    return () => {
      // unsubscribe to load event
      window.removeEventListener('load', loadStorage)
    }
  }, [])

  return (
    <AppContext.Provider value={{ appRef, token, setToken }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
