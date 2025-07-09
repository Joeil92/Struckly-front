import { createContext, useContext } from 'react'

type DropdownContextType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const DropdownContext = createContext<DropdownContextType>({
  isOpen: false,
  setIsOpen: () => {},
})

function useDropdown() {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider')
  }
  return context
}

export { DropdownContext, useDropdown }
