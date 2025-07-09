import { createContext, useContext } from 'react'

type SidebarContextType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
export const SidebarContext = createContext<SidebarContextType>(
  {} as SidebarContextType
)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
