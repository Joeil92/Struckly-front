import userEvent from '@testing-library/user-event'
import { describe, expect, it, Mock, vi } from 'vitest'
import { renderWithProviders } from '../../../shared/lib/test/test.lib'
import { BrowserRouter, useNavigate } from 'react-router'
import { ResetPasswordConfirmForm } from './Reset-password-confirm'
import { screen, waitFor } from '@testing-library/dom'
import api from '../../../shared/api/api.instance'
import { ResetPasswordConfirm } from './reset-password-confirm.types'

describe('ResetPasswordConfirm', () => {
  it('should render reset password confirm form', () => {
    renderResetPasswordConfirmForm()

    expect(
      screen.getByPlaceholderText(
        'reset-password-confirm.form.placeholders.password'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText('reset-password-confirm.form.submit')
    ).toBeInTheDocument()
  })

  it('should call reset password confirm mutation when form is submitted', async () => {
    const mockRequest = (api.patch as Mock).mockImplementation(() =>
      Promise.resolve({})
    )

    const { type, click } = renderResetPasswordConfirmForm()

    const passwordInput = screen.getByPlaceholderText(
      'reset-password-confirm.form.placeholders.password'
    )
    const button = screen.getByRole('button', {
      name: 'reset-password-confirm.form.submit',
    })

    await type(passwordInput, mockResetPasswordConfirm.password)
    await click(button)

    await waitFor(() => {
      expect(passwordInput).toHaveValue(mockResetPasswordConfirm.password)
      expect(mockRequest).toHaveBeenCalledOnce()
    })
  })

  it('should navigate to login when reset password confirm mutation is successful', async () => {
    const navigate = vi.fn()
    ;(useNavigate as Mock).mockReturnValue(navigate)

    const { type, click } = renderResetPasswordConfirmForm()

    await type(
      screen.getByPlaceholderText(
        'reset-password-confirm.form.placeholders.password'
      ),
      mockResetPasswordConfirm.password
    )
    await click(
      screen.getByRole('button', { name: 'reset-password-confirm.form.submit' })
    )

    await waitFor(() => expect(useNavigate).toHaveBeenCalled())
  })

  it('should display error message when reset password confirm failure', async () => {
    ;(api.patch as Mock).mockRejectedValue(new Error('Invalid payload'))

    const { type, click } = renderResetPasswordConfirmForm()

    await type(
      screen.getByPlaceholderText(
        'reset-password-confirm.form.placeholders.password'
      ),
      mockResetPasswordConfirm.password
    )
    await click(
      screen.getByRole('button', { name: 'reset-password-confirm.form.submit' })
    )

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(1))
  })
})

const mockResetPasswordConfirm: ResetPasswordConfirm = {
  password: 'test123456',
  token: 'token',
  userId: '46c25614-983f-4a56-b786-d4555021d547',
}

function renderResetPasswordConfirmForm() {
  const user = userEvent.setup()
  const renderResult = renderWithProviders(
    <BrowserRouter>
      <ResetPasswordConfirmForm
        token={mockResetPasswordConfirm.token}
        userId={mockResetPasswordConfirm.userId}
      />
    </BrowserRouter>
  )
  return { ...renderResult, ...user }
}
