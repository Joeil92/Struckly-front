import { ReactNode } from 'react'
import { useFormField } from './form-hooks'

export function FormLabel({ children }: { children: ReactNode }) {
  const { formItemId } = useFormField()

  return (
    <label
      htmlFor={formItemId}
      className="text-[12px] leading-[16px] font-medium text-black"
    >
      {children}
    </label>
  )
}
