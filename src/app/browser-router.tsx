import { BrowserRouter, Route, Routes } from 'react-router'
import { LoginPage } from '../pages/login'
import { pathKeys } from '../shared/consts/router'
import { ProtectedPage } from '../pages/protected-route'

export function BoostrapedRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={pathKeys.login} element={<LoginPage />} />
        <Route path={pathKeys.dashboard} element={<ProtectedPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
