import { Bell } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  Dropdown,
  DropdownContent,
  DropdownDivider,
  DropdownItem,
  DropdownTrigger,
} from '../../shared/ui/dropdown'
import { useAuth } from '../../entities/session/session.lib'
import { Avatar } from '../../shared/ui/avatar/Avatar'
import { SearchBar } from '../../shared/ui/search-bar'
import { ToggleSidebar } from '../../features/sidebar/toggle-sidebar/Toggle-sidebar.ui'
import { Logout } from '../../features/session/logout/Logout.ui'

export function Topbar() {
  return <BaseTopbar />
}

function BaseTopbar() {
  const { t } = useTranslation()
  const { user } = useAuth()

  return (
    <div className="bg-grey-100 border-grey-200 flex w-full items-center justify-between gap-4 rounded-lg border px-8 py-4">
      <ToggleSidebar />
      <SearchBar
        className="lg:w-[350px]"
        placeholder="Search..."
        value=""
        onChange={() => {}}
      />
      <div className="flex items-center gap-8">
        <Dropdown>
          <DropdownTrigger className="text-grey-500 hover:text-grey-800 cursor-pointer transition-colors duration-200 ease-in-out">
            <Bell />
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem className="justify-center">
              {t('topbar.notifications.no-notifications')}
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              src={user!.avatarUrl || ''}
              alt={user!.email}
              fallback={`${user!.firstName[0]}${user!.lastName[0]}`}
            />
          </DropdownTrigger>
          <DropdownContent>
            <DropdownDivider />
            <Logout />
          </DropdownContent>
        </Dropdown>
      </div>
    </div>
  )
}
