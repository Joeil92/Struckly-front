import { cva, VariantProps } from 'class-variance-authority'
import { Typography } from '../typography'
import {
  Book,
  CircleCheckBig,
  CircleX,
  Frown,
  TriangleAlert,
} from 'lucide-react'
import { ReactNode } from 'react'

const toast = cva(
  'rounded-[6px] p-4 w-[400px] flex flex-col gap-2 animate-fade-left',
  {
    variants: {
      variant: {
        success: 'bg-success-200 text-success-800',
        danger: 'bg-danger-200 text-danger-800',
        warning: 'bg-warning-200 text-warning-800',
        info: 'bg-info-200 text-info-800',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  }
)

export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'content'>,
    VariantProps<typeof toast> {
  title: ReactNode
  content: ReactNode
  onClose: () => void
}

export function Toast({
  variant,
  className,
  title,
  content,
  onClose,
  ...props
}: ToastProps) {
  return (
    <div role="alert" className={toast({ variant, className })} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          {variant === 'success' || !variant ? <CircleCheckBig /> : null}
          {variant === 'danger' ? <Frown /> : null}
          {variant === 'warning' ? <TriangleAlert /> : null}
          {variant === 'info' ? <Book /> : null}
          <Typography tag={'subtitle'}>{title}</Typography>
        </div>
        <CircleX
          className="cursor-pointer hover:opacity-80"
          onClick={onClose}
        />
      </div>
      {typeof content === 'string' ? <p>{content}</p> : content}
    </div>
  )
}
