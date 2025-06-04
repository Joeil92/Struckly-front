import { Suspense } from 'react'
import { SidebarSkeleton } from './Sidebar.skeleton'
import { useSuspenseQuery } from '@tanstack/react-query'
import { organizationByMeQueryOptions } from '../../entities/organization/organization.api'
import { Navigate } from 'react-router'
import { pathKeys } from '../../shared/consts/router'

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
  const { data } = useSuspenseQuery(organizationByMeQueryOptions)

  if (!data) {
    return <Navigate to={pathKeys.createOrganization} />
  }

  return <></>
}
