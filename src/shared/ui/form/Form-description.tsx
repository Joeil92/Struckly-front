import { ReactNode } from 'react'
import { useFormField } from './form-hooks'

export function FormDescription({ children }: { children: ReactNode }) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      id={formDescriptionId}
      className="text-grey-500 text-[12px] leading-[16px] font-medium"
    >
      {children}
    </p>
  )
}
