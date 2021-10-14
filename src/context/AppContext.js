import { createContext, useState } from 'react'

export const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [tab, setTab] = useState('courses')

  return (
    <AppContext.Provider value={{ menuTab: tab, setMenuTab: setTab }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
