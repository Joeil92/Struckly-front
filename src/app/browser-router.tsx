import { BrowserRouter, Route, Routes } from 'react-router'
import { LoginPage } from '../pages/login'
import { pathKeys } from '../shared/consts/router'
import { ProtectedPage } from '../pages/protected-route'
import { ResetPasswordConfirmPage } from '../pages/reset-password-confirm'
import { ResetPasswordPage } from '../pages/reset-password'
import { Dashboard } from '../pages/dashboard'

export function BoostrapedRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={pathKeys.login} element={<LoginPage />} />
        <Route path={pathKeys.resetPassword} element={<ResetPasswordPage />} />
        <Route
          path={pathKeys.resetPasswordConfirm}
          element={<ResetPasswordConfirmPage />}
        />
        <Route path={pathKeys.dashboard} element={<ProtectedPage />}>
          <Route path={pathKeys.dashboard} element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
