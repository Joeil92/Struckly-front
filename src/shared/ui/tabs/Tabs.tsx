import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react'
import { TabsContext, useTabs } from './use-tabs'
import clsx from 'clsx'

type TabsProps = {
  value: string
  setValue: (value: string) => void
}
function Tabs({ value, setValue, children }: PropsWithChildren<TabsProps>) {
  return <TabsContext value={{ value, setValue }}>{children}</TabsContext>
}

function TabsList({
  children,
  className,
  ...props
}: PropsWithChildren<
  DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
>) {
  return (
    <ul className={clsx('bg-grey-100 flex items-center', className)} {...props}>
      {children}
    </ul>
  )
}

interface TabsTriggerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  value: string
}
function TabsTrigger({
  value,
  children,
  className,
  ...props
}: PropsWithChildren<TabsTriggerProps>) {
  const { value: defaultValue, setValue } = useTabs()

  return (
    <li
      onClick={() => setValue(value)}
      className={clsx(
        'hover:text-primary-500 cursor-pointer border border-transparent px-8 py-2 transition-colors duration-200 ease-in-out',
        value === defaultValue
          ? 'text-primary-500 border-b-primary-500'
          : 'text-grey-800',
        className
      )}
      {...props}
    >
      {children}
    </li>
  )
}

export { Tabs, TabsList, TabsTrigger }
