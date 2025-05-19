import { BrowserRouter, Route, Routes } from 'react-router'
import { LoginPage } from '../pages/login'
import { pathKeys } from '../shared/consts/router'

export function BoostrapedRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={pathKeys.login} element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}
