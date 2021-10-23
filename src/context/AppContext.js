import { createContext, useState } from 'react'

export const AppContext = createContext()

const AppProvider = ({ children }) => {
  const appRef = 'ref/hive-institute' // application reference :id
  const [token, setToken] = useState()

  // watch token and log into local Storage

  return (
    <AppContext.Provider value={{ appRef, token, setToken }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
