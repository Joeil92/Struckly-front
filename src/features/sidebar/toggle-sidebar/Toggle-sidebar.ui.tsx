import { PanelLeft } from 'lucide-react'
import { useSidebar } from '../sidebar.lib'

export function ToggleSidebar() {
  const { isOpen, setIsOpen } = useSidebar()

  return (
    <button
      className="hover:bg-grey-200 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg p-1 transition-colors duration-200 ease-in-out"
      onClick={() => setIsOpen(!isOpen)}
    >
      <PanelLeft className="text-grey-500 h-[18px] w-[18px]" />
    </button>
  )
}
