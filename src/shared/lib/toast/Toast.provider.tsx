import { useState } from 'react'
import { ToastContext } from './Toast.context'
import { Toast as ToastType } from './toast.types'
import { Toast, ToastContainer } from '../../ui/toast'

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [toasts, setToasts] = useState<Array<ToastType>>([])

  const addToast = ({ title, content, variant }: Omit<ToastType, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 15)
    setToasts((prevToasts) => [...prevToasts, { id, title, content, variant }])
    setTimeout(() => removeToast(id), 3000)
  }

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            title={toast.title}
            content={toast.content}
            variant={toast.variant}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </ToastContext>
  )
}
