import { ReactNode } from 'react'

export type ToastContextType = {
  toasts: Array<Toast>
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export type Toast = {
  id: string
  title: ReactNode
  content: ReactNode
  variant: 'success' | 'danger' | 'warning' | 'info'
}
