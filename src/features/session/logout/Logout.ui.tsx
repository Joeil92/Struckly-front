import { LogOut } from 'lucide-react'
import { DropdownItem } from '../../../shared/ui/dropdown'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../../entities/session/session.lib'

export function Logout() {
  const { t } = useTranslation()
  const { logout } = useAuth()

  return (
    <DropdownItem className="text-danger-500" onClick={logout}>
      <LogOut className="h-4 w-4" />
      {t('topbar.profile.logout')}
    </DropdownItem>
  )
}
