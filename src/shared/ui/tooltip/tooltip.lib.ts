import { createContext, useContext } from 'react'

type TooltipContextType = {
  isHover: boolean
  setIsHover: (isHover: boolean) => void
}
const TooltipContext = createContext({} as TooltipContextType)

function useTooltip() {
  const context = useContext(TooltipContext)
  if (!context) {
    throw new Error('useTooltip must be used within a TooltipProvider')
  }
  return context
}

export { TooltipContext, useTooltip }
