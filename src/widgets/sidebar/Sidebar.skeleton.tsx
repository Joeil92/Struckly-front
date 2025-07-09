import { Skeleton } from '../../shared/ui/skeleton'
import { Separator } from '../../shared/ui/separator'

export function SidebarSkeleton() {
  return (
    <div className="border-grey-200 bg-grey-100 flex w-[280px] flex-col gap-4 border-r p-4">
      <OrganizationSkeleton />
      <Separator />
      <div className="flex flex-1 flex-col gap-4">
        {Array(5)
          .fill('')
          .map((_, index) => (
            <NavLinkSkeleton key={index} />
          ))}
      </div>
    </div>
  )
}

function OrganizationSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton style={'rectangle'} size={'xl'} />
      <div className="flex w-full flex-col gap-2">
        <Skeleton style={'text'} size={'sm'} />
        <div className="w-[50%]">
          <Skeleton style={'text'} size={'sm'} />
        </div>
      </div>
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
