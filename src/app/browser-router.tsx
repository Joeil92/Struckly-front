import { BrowserRouter, Route, Routes } from 'react-router'
import { LoginPage } from '../pages/login'
import { pathKeys } from '../shared/consts/router'
import { ProtectedPage } from '../pages/protected-route'
import { ResetPasswordConfirmPage } from '../pages/reset-password-confirm'
import { ResetPasswordPage } from '../pages/reset-password'
import { Dashboard } from '../pages/dashboard'
import { SignUpPage } from '../pages/sign-up/Sign-up-page'
import { CreateOrganizationPage } from '../pages/create-organization/Create-organization-page'
import { Organization } from '../pages/organization/Organization'

export function BoostrapedRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={pathKeys.login} element={<LoginPage />} />
        <Route path={pathKeys.signUp} element={<SignUpPage />} />
        <Route
          path={pathKeys.createOrganization}
          element={<CreateOrganizationPage />}
        />
        <Route path={pathKeys.resetPassword} element={<ResetPasswordPage />} />
        <Route
          path={pathKeys.resetPasswordConfirm}
          element={<ResetPasswordConfirmPage />}
        />
        <Route path={pathKeys.dashboard} element={<ProtectedPage />}>
          <Route element={<Dashboard />} index />
          <Route path={pathKeys.organization} element={<Organization />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
