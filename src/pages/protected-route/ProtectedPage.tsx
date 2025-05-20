import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../entities/session/session.lib'
import { pathKeys } from '../../shared/consts/router'

export function ProtectedPage() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={pathKeys.login} />
  }

  return <Outlet />
}
