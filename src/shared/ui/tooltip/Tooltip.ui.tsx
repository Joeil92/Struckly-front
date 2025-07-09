import { cva, VariantProps } from 'class-variance-authority'
import { HtmlHTMLAttributes, PropsWithChildren, useState } from 'react'
import { TooltipContext, useTooltip } from './tooltip.lib'
import clsx from 'clsx'

function Tooltip({ children }: PropsWithChildren) {
  const [isHover, setIsHover] = useState(false)

  return (
    <TooltipContext value={{ isHover, setIsHover }}>
      <div className="relative">{children}</div>
    </TooltipContext>
  )
}

function TooltipTrigger({
  children,
  ...props
}: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>) {
  const { setIsHover } = useTooltip()

  return (
    <div
      {...props}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
    </div>
  )
}

const tooltipContent = cva(
  'absolute z-50 rounded-lg p-2 bg-[#2A2B2C] text-white transition-opacity duration-200 min-w-[150px] text-center',
  {
    variants: {
      open: {
        true: 'opacity-100 pointer-events-auto',
        false: 'opacity-0 pointer-events-none',
      },
      direction: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-4',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-4',
        left: 'right-full top-1/2 -translate-y-1/2 mr-4',
        right: 'left-full top-1/2 -translate-y-1/2 ml-4',
      },
    },
    defaultVariants: {
      open: false,
      direction: 'top',
    },
  }
)

interface TooltipContentProps
  extends VariantProps<typeof tooltipContent>,
    HtmlHTMLAttributes<HTMLDivElement> {
  direction: 'top' | 'bottom' | 'left' | 'right'
}

function TooltipContent({
  children,
  direction,
  className,
  ...props
}: PropsWithChildren<TooltipContentProps>) {
  const { isHover: open } = useTooltip()

  return (
    <div {...props} className={tooltipContent({ direction, open, className })}>
      <div
        className={clsx('absolute h-2.5 w-2.5 rotate-45 bg-[#2A2B2C]', {
          'top-full left-1/2 -translate-x-1/2 -translate-y-1/2':
            direction === 'top',
          'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2':
            direction === 'bottom',
          'top-1/2 left-full -translate-x-1/2 -translate-y-1/2':
            direction === 'left',
          'top-1/2 right-full translate-x-1/2 -translate-y-1/2':
            direction === 'right',
        })}
      />
      {children}
    </div>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent }
