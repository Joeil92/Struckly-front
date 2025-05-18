import { ReactNode } from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'

export function Form<T extends FieldValues = FieldValues>({
  children,
  onSubmit,
  className,
  ...props
}: UseFormReturn<T> & {
  children: ReactNode
  onSubmit: (data: T) => void
  className?: string
}) {
  return (
    <FormProvider {...props}>
      <form onSubmit={props.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  )
}
