import { Suspense } from 'react'
import { SidebarSkeleton } from './Sidebar.skeleton'
import { useSuspenseQuery } from '@tanstack/react-query'
import { organizationByMeQueryOptions } from '../../entities/organization/organization.api'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { pathKeys } from '../../shared/consts/router'
import { Typography } from '../../shared/ui/typography'
import { Image, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Separator } from '../../shared/ui/separator'
import { menuList } from './sidebar.lib'
import clsx from 'clsx'

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
  const location = useLocation()
  const menu = menuList(location.pathname)

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
        {data.logoUrl ? (
          <img src={data.logoUrl} alt="logo" className="h-10 w-10 rounded-sm" />
        ) : (
          <Image className="bg-grey-200 text-grey-500 h-10 w-10 rounded-sm p-2" />
        )}
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
      <div className="flex flex-col gap-4 px-4 pt-4">
        <Typography tag={'small'} className="text-grey-500">
          Menu
        </Typography>
        <ul>
          {menu.map((item, index) => (
            <li key={index}>
              <Link to={item.href}>
                <div
                  className={clsx(
                    'flex items-center gap-4 rounded-sm p-2 transition-colors duration-200 ease-in-out',
                    item.active
                      ? 'text-primary-400 bg-primary-100'
                      : 'text-grey-500 hover:bg-primary-100 hover:text-primary-400'
                  )}
                >
                  {item.icon}
                  <Typography tag={'small'} className="font-medium">
                    {t(item.label)}
                  </Typography>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
