import { cva, VariantProps } from 'class-variance-authority'
import { UseFormRegisterReturn } from 'react-hook-form'

const input = cva(
  'w-full border rounded-[3px] p-2 focus:outline-none placeholder-grey-300',
  {
    variants: {
      isError: {
        false: 'border-grey-300 focus:border-primary-300',
        true: 'border-danger-300 focus:border-danger-300 text-danger-500',
      },
    },
    defaultVariants: {
      isError: false,
    },
  }
)

export interface InputProps
  extends Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      'className' | 'placeholder' | 'type'
    >,
    UseFormRegisterReturn,
    VariantProps<typeof input> {}

export function Input({ className, isError, ...props }: InputProps) {
  return <input className={input({ isError, className })} {...props} />
}
