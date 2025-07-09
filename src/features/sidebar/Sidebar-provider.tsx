import { PropsWithChildren } from 'react'
import { SidebarContext } from './sidebar.lib'
import { useLocalStorage } from '../../shared/hooks/use-local-storage'

export function SidebarProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useLocalStorage<boolean>('sidebar-state', true)

  return (
    <SidebarContext value={{ isOpen, setIsOpen }}>{children}</SidebarContext>
  )
}
