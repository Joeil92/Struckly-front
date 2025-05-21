import { ReactNode } from 'react'

export function ToastContainer({ children }: { children: ReactNode }) {
  return (
    <div className="position-fixed absolute end-0 bottom-0 z-50 space-y-8 overflow-hidden p-3">
      {children}
    </div>
  )
}
