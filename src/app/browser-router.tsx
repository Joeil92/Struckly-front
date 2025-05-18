import { BrowserRouter, Route, Routes } from 'react-router'
import { LoginPage } from '../pages/login'

export function BoostrapedRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}
