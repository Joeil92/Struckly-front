import { LayoutGrid } from 'lucide-react'
import { Menu } from './sidebar.types'
import { pathKeys } from '../../shared/consts/router'

export function menuList(pathName: string): Menu[] {
  return [
    {
      label: 'sidebar.menu.dashboard',
      href: pathKeys.dashboard,
      icon: <LayoutGrid className="h-5 w-5" />,
      active: pathName.includes(pathKeys.dashboard),
    },
  ]
}
