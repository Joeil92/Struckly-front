import { describe, expect, it, Mock, vi } from 'vitest'
import { renderWithProviders } from '../../../shared/lib/test/test.lib'
import { BrowserRouter, useNavigate } from 'react-router'
import LoginForm from './Login'
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/dom'
import api from '../../../shared/api/api.instance'
import { LoginUser } from './login.types'

describe('LoginForm', () => {
  it('should render login form', () => {
    renderLoginForm()

    expect(screen.getByPlaceholderText('login.form.email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('••••••')).toBeInTheDocument()
    expect(screen.getByText('login.form.submit')).toBeInTheDocument()
  })

  it('should call login mutation when form is submitted', async () => {
    const mockRequest = (api.post as Mock).mockResolvedValue({})

    const { type, click } = renderLoginForm()

    await type(
      screen.getByPlaceholderText('login.form.email'),
      mockLoginUser.email
    )
    await type(screen.getByPlaceholderText('••••••'), mockLoginUser.password)
    await click(screen.getByRole('button', { name: 'login.form.submit' }))

    await waitFor(() => expect(mockRequest).toHaveBeenCalled())
  })

  it('should navigate to dashboard when login mutation is successful', async () => {
    const navigate = vi.fn()
    ;(useNavigate as Mock).mockReturnValue(navigate)

    const { type, click } = renderLoginForm()

    await type(
      screen.getByPlaceholderText('login.form.email'),
      mockLoginUser.email
    )
    await type(screen.getByPlaceholderText('••••••'), mockLoginUser.password)
    await click(screen.getByRole('button', { name: 'login.form.submit' }))

    await waitFor(() => expect(useNavigate).toHaveBeenCalled())
  })

  it('should display error message when login failure', async () => {
    ;(api.post as Mock).mockRejectedValue(new Error('Invalid credentials'))

    const { type, click } = renderLoginForm()

    await type(
      screen.getByPlaceholderText('login.form.email'),
      mockLoginUser.email
    )
    await type(screen.getByPlaceholderText('••••••'), mockLoginUser.password)
    await click(screen.getByRole('button', { name: 'login.form.submit' }))

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(1))
  })
})

function renderLoginForm() {
  const user = userEvent.setup({ delay: null })
  const renderResult = renderWithProviders(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  )
  return { ...renderResult, ...user }
}

const mockLoginUser: LoginUser = {
  email: 'test@test.com',
  password: 'test123456',
}
