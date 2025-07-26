import { createContext, useContext } from 'react'

type TabsContext = {
  value: string
  setValue: (value: string) => void
}
const TabsContext = createContext<TabsContext>({} as TabsContext)

function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider')
  }
  return context
}

export { TabsContext, useTabs }
