import { cva } from 'class-variance-authority'
import { Typography } from '../typography'

const cardTitle = cva('')

export function CardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Typography tag={'h5'} className={cardTitle({ className })} {...props}>
      {children}
    </Typography>
  )
}
