import { cva, VariantProps } from 'class-variance-authority'

const skeleton = cva('bg-grey-300 animate-pulse', {
  variants: {
    style: {
      rectangle: 'rounded-sm',
      circle: 'rounded-full',
      text: 'w-full rounded-sm',
    },
    size: {
      xs: 'h-1 w-1',
      sm: 'h-2 w-2',
      md: 'h-4 w-4',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    },
  },
  defaultVariants: {
    style: 'rectangle',
    size: 'md',
  },
})

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>,
    VariantProps<typeof skeleton> {}

export function Skeleton({ style, size, className, ...props }: SkeletonProps) {
  return <div className={skeleton({ style, size, className })} {...props} />
}
