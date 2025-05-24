import { describe, expect, it, Mock, vi } from 'vitest'
import { ResetPassword } from './reset-password.types'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router'
import { ResetPasswordForm } from './Reset-password'
import { renderWithProviders } from '../../../shared/lib/test/test.lib'
import { screen, waitFor } from '@testing-library/dom'
import api from '../../../shared/api/api.instance'

describe('Reset-password', () => {
  it('should render reset password form', () => {
    renderResetPasswordForm()

    expect(
      screen.getByPlaceholderText('reset-password.form.placeholders.email')
    ).toBeInTheDocument()
    expect(screen.getByText('reset-password.form.submit')).toBeInTheDocument()
  })

  it('should call reset password mutation when form is submitted', async () => {
    const mockRequest = (api.post as Mock).mockResolvedValue({})

    const { type, click } = renderResetPasswordForm()

    await type(
      screen.getByPlaceholderText('reset-password.form.placeholders.email'),
      mockResetPassword.email
    )
    await click(
      screen.getByRole('button', { name: 'reset-password.form.submit' })
    )

    await waitFor(() => expect(mockRequest).toHaveBeenCalled())
  })

  it('should call onSubmited callback when mutation is successful', async () => {
    const { type, click } = renderResetPasswordForm()

    await type(
      screen.getByPlaceholderText('reset-password.form.placeholders.email'),
      mockResetPassword.email
    )
    await click(
      screen.getByRole('button', { name: 'reset-password.form.submit' })
    )

    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
  })

  it('should display error message when form is invalid', async () => {
    ;(api.post as Mock).mockRejectedValue(new Error('Unknown error'))

    const { type, click } = renderResetPasswordForm()

    await type(
      screen.getByPlaceholderText('reset-password.form.placeholders.email'),
      mockResetPassword.email
    )
    await click(
      screen.getByRole('button', { name: 'reset-password.form.submit' })
    )

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(1))
  })
})

function renderResetPasswordForm() {
  const user = userEvent.setup({ delay: null })
  const renderResult = renderWithProviders(
    <BrowserRouter>
      <ResetPasswordForm onSubmit={onSubmit} />
    </BrowserRouter>
  )
  return { ...renderResult, ...user }
}

const onSubmit = vi.fn().mockImplementation(() => {})

const mockResetPassword: ResetPassword = {
  email: 'test@test.com',
}
