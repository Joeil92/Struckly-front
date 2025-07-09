import { cva, VariantProps } from 'class-variance-authority'

const avatar = cva(
  'flex items-center justify-center rounded-full bg-grey-200 w-10 h-10',
  {
    variants: {
      size: {
        xl: 'w-10 h-10',
        lg: 'w-8 h-8',
        md: 'w-6 h-6',
        sm: 'w-4 h-4',
        xs: 'w-2 h-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

interface AvatarProps extends VariantProps<typeof avatar> {
  src: string
  alt: string
  fallback?: string
}
export function Avatar({ src, alt, fallback, size }: AvatarProps) {
  return (
    <div className={avatar({ size })}>
      {src && (
        <img src={src} alt={alt} className="h-full w-full rounded-full" />
      )}
      {!src && <div className="text-grey-500 text-sm">{fallback}</div>}
    </div>
  )
}
