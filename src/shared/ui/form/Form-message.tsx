import { cva, VariantProps } from 'class-variance-authority'

const formMessage = cva('text-[10px] leading-[14px] font-medium', {
  variants: {
    isError: {
      false: 'text-grey-500',
      true: 'text-danger-500',
    },
  },
  defaultVariants: {
    isError: false,
  },
})

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof formMessage> {}

export function FormMessage({
  children,
  isError,
  className,
  ...props
}: FormMessageProps) {
  return (
    <p className={formMessage({ isError, className })} {...props}>
      {children}
    </p>
  )
}
