import { cva } from 'class-variance-authority'
import { UseFormRegisterReturn } from 'react-hook-form'

const radio = cva('w-4 h-4')

export interface RadioProps
  extends Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      'className' | 'placeholder' | 'value'
    >,
    UseFormRegisterReturn {}

export function Radio({ className, ...props }: RadioProps) {
  return <input type="radio" className={radio({ className })} {...props} />
}
