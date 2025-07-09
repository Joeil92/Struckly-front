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
import { menuList } from './Sidebar.lib'
import clsx from 'clsx'
import { useSidebar } from '../../features/sidebar/sidebar.lib'
import { Menu } from './sidebar.types'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../shared/ui/tooltip/Tooltip.ui'

export function Sidebar() {
  const { isOpen } = useSidebar()

  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <BaseSidebar isOpen={isOpen} />
    </Suspense>
  )
}

function BaseSidebar({ isOpen }: { isOpen: boolean }) {
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
    <div
      className={clsx(
        'bg-grey-100 border-grey-200 border-r transition-[width] duration-300 ease-in-out',
        isOpen ? 'w-[280px]' : 'w-[80px]'
      )}
    >
      <div
        className={clsx(
          'hover:bg-grey-200 flex cursor-pointer justify-start gap-4 p-4 transition-colors duration-200 ease-in-out',
          isOpen ? 'items-start' : 'items-center'
        )}
        onClick={onClickOrganization}
      >
        {data.logoUrl ? (
          <img src={data.logoUrl} alt="logo" className="h-10 w-10 rounded-sm" />
        ) : (
          <Image className="bg-grey-200 text-grey-500 h-10 w-10 rounded-sm p-2" />
        )}
        {isOpen ? (
          <div className="overflow-hidden">
            <Typography className="truncate font-medium">
              {data.name}
            </Typography>
            <div className="text-grey-800 flex items-center gap-2">
              <Users className="h-3 w-3" />
              <Typography tag={'small'} className="whitespace-nowrap">
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
        ) : null}
      </div>
      <Separator />
      <div
        className={clsx(
          'flex flex-col gap-4 px-4 pt-4',
          !isOpen && 'items-center'
        )}
      >
        <Typography tag={'small'} className="text-grey-500">
          Menu
        </Typography>
        <ul className="w-full">
          {menu.map((item, index) => (
            <MenuItem key={index} item={item} isOpen={isOpen} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function MenuItem({ item, isOpen }: { item: Menu; isOpen: boolean }) {
  const { t } = useTranslation()

  return (
    <li>
      {isOpen ? (
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
            <Typography
              tag={'small'}
              className={clsx(
                'truncate font-medium whitespace-nowrap',
                !isOpen && 'hidden'
              )}
            >
              {t(item.label)}
            </Typography>
          </div>
        </Link>
      ) : (
        <Tooltip>
          <TooltipTrigger>
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
                <Typography
                  tag={'small'}
                  className={clsx(
                    'truncate font-medium whitespace-nowrap',
                    !isOpen && 'hidden'
                  )}
                >
                  {t(item.label)}
                </Typography>
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent direction={'right'} className="ml-8">
            <Typography>{t(item.label)}</Typography>
          </TooltipContent>
        </Tooltip>
      )}
    </li>
  )
}
