import { ChevronsUpDown } from 'lucide-react'
import { Skeleton } from '../../shared/ui/skeleton'
import { Separator } from '../../shared/ui/separator'

export function SidebarSkeleton() {
  return (
    <div className="flex w-[280px] flex-col gap-4 bg-white p-4">
      <SelectEntrepriseSkeleton />
      <Separator />
      <div className="flex flex-1 flex-col gap-4">
        {Array(5)
          .fill('')
          .map((_, index) => (
            <NavLinkSkeleton key={index} />
          ))}
      </div>
      <FooterSkeleton />
    </div>
  )
}

function SelectEntrepriseSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton style={'rectangle'} size={'xl'} />
      <div className="flex w-full flex-col gap-2">
        <Skeleton style={'text'} size={'sm'} />
        <div className="w-[50%]">
          <Skeleton style={'text'} size={'sm'} />
        </div>
      </div>
      <ChevronsUpDown className="text-grey-500" />
    </div>
  )
}

function NavLinkSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton style={'rectangle'} size={'md'} />
      <Skeleton style={'text'} size={'md'} />
    </div>
  )
}

function FooterSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array(2)
        .fill('')
        .map((_, index) => (
          <NavLinkSkeleton key={index} />
        ))}
      <Separator />
      <div className="flex gap-4">
        <Skeleton style={'rectangle'} size={'md'} />
        <div className="flex w-full flex-col gap-1">
          <Skeleton style={'text'} size={'sm'} />
          <div className="w-[50%]">
            <Skeleton style={'text'} size={'xs'} />
          </div>
        </div>
      </div>
    </div>
  )
}
