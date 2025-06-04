import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../entities/session/session.lib'
import { pathKeys } from '../../shared/consts/router'
import { Sidebar } from '../../widgets/sidebar/Sidebar.ui'

export function ProtectedPage() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={pathKeys.login} />
  }

  return (
    <main className="flex h-screen flex-row">
      <Sidebar />
      <Outlet />
    </main>
  )
}
