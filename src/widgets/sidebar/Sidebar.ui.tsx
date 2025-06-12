import { Suspense } from 'react'
import { SidebarSkeleton } from './Sidebar.skeleton'
import { useSuspenseQuery } from '@tanstack/react-query'
import { organizationByMeQueryOptions } from '../../entities/organization/organization.api'
import { Navigate, useNavigate } from 'react-router'
import { pathKeys } from '../../shared/consts/router'
import { Typography } from '../../shared/ui/typography'
import { Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Separator } from '../../shared/ui/separator'

export function Sidebar() {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <BaseSidebar />
    </Suspense>
  )
}

function BaseSidebar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data } = useSuspenseQuery(organizationByMeQueryOptions)

  if (!data) {
    return <Navigate to={pathKeys.createOrganization} />
  }

  const onClickOrganization = () => {
    navigate(pathKeys.organization)
  }

  return (
    <div className="bg-grey-100 border-grey-200 w-[280px] border-r">
      <div
        className="hover:bg-grey-200 flex cursor-pointer items-start justify-start gap-4 p-4 transition-colors duration-200 ease-in-out"
        onClick={onClickOrganization}
      >
        <img src={data.logoUrl} alt="logo" className="h-10 w-10 rounded-sm" />
        <div className="overflow-hidden">
          <Typography className="truncate font-medium">{data.name}</Typography>
          <div className="text-grey-800 flex items-center gap-2">
            <Users className="h-3 w-3" />
            <Typography tag={'small'}>
              {t(
                data.membersCount <= 1
                  ? 'sidebar.organization-members'
                  : 'sidebar.organization-members-plural',
                {
                  count: data.membersCount,
                }
              )}
            </Typography>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  )
}
