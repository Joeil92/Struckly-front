import { cva, VariantProps } from 'class-variance-authority'

const label = cva('text-[12px] leading-[16px] font-medium', {
  variants: {
    isError: {
      false: 'text-black',
      true: 'text-danger-500',
    },
  },
  defaultVariants: {
    isError: false,
  },
})

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof label> {}

export function Label({ children, isError, className, ...props }: LabelProps) {
  return (
    <label className={label({ isError, className })} {...props}>
      {children}
    </label>
  )
}
