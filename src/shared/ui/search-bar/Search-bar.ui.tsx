import clsx from 'clsx'
import { Search } from 'lucide-react'

interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export function SearchBar({
  placeholder,
  className,
  value,
  onChange,
  ...props
}: SearchBarProps) {
  return (
    <div
      className={clsx(
        'border-grey-200 flex items-center justify-center gap-4 rounded-[50px] border bg-white px-4 py-2',
        className
      )}
      {...props}
    >
      <Search className="text-grey-800 h-[18px] w-[18px]" />
      <input
        type="text"
        className="text-grey-800 placeholder:text-grey-500 w-full bg-transparent outline-none"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}
