import { cva } from 'class-variance-authority'
import { AnchorHTMLAttributes } from 'react'

const link = cva(
  'text-primary-500 hover:text-primary-600 hover:underline transition-colors'
)

export function Link({
  children,
  href,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={link({ className })} {...props}>
      {children}
    </a>
  )
}
