import { cva } from 'class-variance-authority'

const card = cva('flex flex-col gap-8 rounded-lg bg-white p-8 shadow-sm')

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={card({ className })} {...props}>
      {children}
    </div>
  )
}
