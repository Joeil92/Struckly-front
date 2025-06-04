import { cva, VariantProps } from 'class-variance-authority'

const skeleton = cva('bg-grey-300 animate-pulse', {
  variants: {
    style: {
      rectangle: 'rounded-sm',
      circle: 'rounded-full',
      text: 'w-full rounded-sm',
    },
    size: {
      xs: 'h-2 w-2',
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
      xl: 'h-12 w-12',
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
