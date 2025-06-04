import { cva, VariantProps } from 'class-variance-authority'
import { HtmlHTMLAttributes } from 'react'

const radioContainer = cva('flex items-center gap-2', {
  variants: {
    isError: {
      true: 'border-danger-300 focus:border-danger-300 text-danger-500',
      false: '',
    },
  },
})

export interface RadioContainerProps
  extends HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radioContainer> {}

export function RadioContainer({
  children,
  className,
  isError,
  ...props
}: RadioContainerProps) {
  return (
    <div className={radioContainer({ className, isError })} {...props}>
      {children}
    </div>
  )
}
