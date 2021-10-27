import { createContext, useState } from 'react'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicEffect'

export const AppContext = createContext()

const AppProvider = ({ children }) => {
  const appRef = 'ref/hive-institute' // application reference :id
  const [token, setToken] = useState()

  return (
    <AppContext.Provider value={{ appRef, token, setToken }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
