import { createContext } from 'react'

export const AppContext = createContext()

const AppProvider = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}

export default AppProvider
