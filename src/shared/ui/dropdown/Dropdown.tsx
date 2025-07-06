import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import { DropdownContext, useDropdown } from './use-dropdown'
import clsx from 'clsx'

type DropdownProps = {
  defaultValue?: boolean
}
function Dropdown({
  defaultValue = false,
  children,
}: PropsWithChildren<DropdownProps>) {
  const [isOpen, setIsOpen] = useState(defaultValue)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <DropdownContext value={{ isOpen, setIsOpen }}>
      <div ref={ref} className="relative">
        {children}
      </div>
    </DropdownContext>
  )
}

function DropdownTrigger({
  children,
  className,
  onClick,
  ...props
}: PropsWithChildren<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>) {
  const { setIsOpen, isOpen } = useDropdown()

  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    onClick?.(e)
    setIsOpen(!isOpen)
  }

  return (
    <button
      className={clsx('cursor-pointer', className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

function DropdownContent({ children }: PropsWithChildren) {
  const { isOpen } = useDropdown()

  return (
    <div
      className={clsx(
        'border-grey-200 animate-fade animate-duration-200 absolute top-full left-1/2 z-10 mt-2 min-w-[180px] -translate-x-1/2 rounded-lg border bg-white py-2 shadow-md',
        isOpen ? '' : 'hidden'
      )}
    >
      {children}
    </div>
  )
}

function DropdownLabel({ children }: PropsWithChildren) {
  return <div className="mx-2 px-2 text-sm">{children}</div>
}

function DropdownItem({
  children,
  onClick,
  className,
  ...props
}: PropsWithChildren<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) {
  const { setIsOpen } = useDropdown()

  const handleClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    onClick?.(e)
    setIsOpen(false)
  }

  return (
    <div
      className={clsx(
        'hover:bg-grey-100 mx-2 flex cursor-pointer items-center gap-2 rounded-sm p-2 text-sm transition-colors duration-200 ease-in-out',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  )
}

function DropdownDivider() {
  return <div className="border-grey-200 my-2 border-t" />
}

export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownDivider,
}
