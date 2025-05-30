import { Suspense } from 'react'
import { SidebarSkeleton } from './Sidebar.skeleton'

export function Sidebar() {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <div className="w-[280px] bg-white p-4">
        <BaseSidebar />
      </div>
    </Suspense>
  )
}

function BaseSidebar() {
  return <></>
}
