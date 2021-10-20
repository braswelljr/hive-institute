import { createContext, useState, useEffect } from 'react'

export const AppContext = createContext()

const AppProvider = ({ children }) => {
  const appRef = 'ref/hive-institute'
  const [token, setToken] = useState()

  // watch token and log into local Storage
  useEffect(() => {
    // watch if storage is defined
    if (typeof Storage !== 'undefined') {
      // set storage item if not available
      localStorage.getItem(appRef) === null
        ? localStorage.setItem(appRef, JSON.stringify(token))
        : setToken(JSON.parse(localStorage.getItem(appRef)))
    }
  }, [])

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
