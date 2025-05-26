import { cva } from 'class-variance-authority'

const cardHeader = cva('')

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cardHeader({ className })} {...props}>
      {children}
    </div>
  )
}
