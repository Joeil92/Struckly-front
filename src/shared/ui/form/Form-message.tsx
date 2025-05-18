import { ReactNode } from 'react'
import { useFormField } from './form-hooks'

export function FormMessage({ children }: { children?: ReactNode }) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      id={formMessageId}
      className="text-danger-500 text-[12px] leading-[16px] font-medium"
      role="alert"
    >
      {body}
    </p>
  )
}
