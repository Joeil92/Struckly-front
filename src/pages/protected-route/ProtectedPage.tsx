import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../entities/session/session.lib'
import { pathKeys } from '../../shared/consts/router'
import { Sidebar } from '../../widgets/sidebar/Sidebar.ui'
import { Topbar } from '../../widgets/topbar/Topbar.ui'

export function ProtectedPage() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={pathKeys.login} />
  }

  return (
    <main className="flex h-screen flex-row">
      <Sidebar />
      <main className="mx-8 my-4 w-full xl:mx-32">
        <Topbar />
        <Outlet />
      </main>
    </main>
  )
}
