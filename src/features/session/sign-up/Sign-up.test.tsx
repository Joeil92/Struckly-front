import userEvent from '@testing-library/user-event'
import { describe, expect, it, Mock, vi } from 'vitest'
import { renderWithProviders } from '../../../shared/lib/test/test.lib'
import { BrowserRouter, useNavigate } from 'react-router'
import SignUpForm from './Sign-up'
import { SignUp } from './sign-up.types'
import { screen, waitFor } from '@testing-library/dom'
import api from '../../../shared/api/api.instance'

describe('SignUpForm', () => {
  it('should render sign up form', () => {
    renderSignUpForm()

    expect(
      screen.getByPlaceholderText('sign-up.form.placeholders.firstName')
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('sign-up.form.placeholders.lastName')
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('sign-up.form.placeholders.email')
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('sign-up.form.placeholders.password')
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('sign-up.form.placeholders.confirm-password')
    ).toBeInTheDocument()
    expect(screen.getByText('sign-up.form.submit')).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(3)
  })

  it('should call sign up mutation when form is submitted', async () => {
    const mockRequest = (api.post as Mock).mockResolvedValue({})

    const { type, click } = renderSignUpForm()

    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.firstName'),
      mockSignUp.firstName
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.lastName'),
      mockSignUp.lastName
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.email'),
      mockSignUp.email
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.password'),
      mockSignUp.password
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.confirm-password'),
      mockSignUp.confirmPassword
    )
    await click(screen.getAllByRole('radio')[0])
    await click(screen.getByRole('button', { name: 'sign-up.form.submit' }))

    await waitFor(() => expect(mockRequest).toHaveBeenCalled())
  })

  it('should navigate to dashboard when sign up mutation is successful and invitation token', async () => {
    const navigate = vi.fn()
    ;(useNavigate as Mock).mockReturnValue(navigate)

    const { type, click } = renderSignUpForm('invitationToken')

    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.firstName'),
      mockSignUp.firstName
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.lastName'),
      mockSignUp.lastName
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.email'),
      mockSignUp.email
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.password'),
      mockSignUp.password
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.confirm-password'),
      mockSignUp.confirmPassword
    )
    await click(screen.getAllByRole('radio')[0])
    await click(screen.getByRole('button', { name: 'sign-up.form.submit' }))

    await waitFor(() => expect(useNavigate).toHaveBeenCalled())
  })

  it('should navigate to create organization when sign up mutation is successful and no invitation token', async () => {
    const navigate = vi.fn()
    ;(useNavigate as Mock).mockReturnValue(navigate)

    const { type, click } = renderSignUpForm()

    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.firstName'),
      mockSignUp.firstName
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.lastName'),
      mockSignUp.lastName
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.email'),
      mockSignUp.email
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.password'),
      mockSignUp.password
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.confirm-password'),
      mockSignUp.confirmPassword
    )
    await click(screen.getAllByRole('radio')[0])
    await click(screen.getByRole('button', { name: 'sign-up.form.submit' }))

    await waitFor(() => expect(useNavigate).toHaveBeenCalled())
  })

  it('should display error message when sign up failure', async () => {
    ;(api.post as Mock).mockImplementation(() =>
      Promise.reject({ statusCode: 400 })
    )

    const { type, click } = renderSignUpForm()

    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.firstName'),
      mockSignUp.firstName
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.lastName'),
      mockSignUp.lastName
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.email'),
      mockSignUp.email
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.password'),
      mockSignUp.password
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.confirm-password'),
      mockSignUp.confirmPassword
    )
    await click(screen.getAllByRole('radio')[0])
    await click(screen.getByRole('button', { name: 'sign-up.form.submit' }))

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(1))
  })

  it('should display error message when email already exists', async () => {
    ;(api.post as Mock).mockImplementation(() =>
      Promise.reject({
        statusCode: 409,
      })
    )

    const { type, click } = renderSignUpForm()

    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.firstName'),
      mockSignUp.firstName
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.lastName'),
      mockSignUp.lastName
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.email'),
      mockSignUp.email
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.password'),
      mockSignUp.password
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.confirm-password'),
      mockSignUp.confirmPassword
    )
    await click(screen.getAllByRole('radio')[0])
    await click(screen.getByRole('button', { name: 'sign-up.form.submit' }))

    await waitFor(() => {
      expect(
        screen.getByText('sign-up.form.errors.email-already-exists.description')
      ).toBeInTheDocument()
    })
  })

  it('should display error message when passwords do not match', async () => {
    const { type, click } = renderSignUpForm()

    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.firstName'),
      mockSignUp.firstName
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.lastName'),
      mockSignUp.lastName
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.email'),
      mockSignUp.email
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.password'),
      mockSignUp.password
    )
    await type(
      screen.getByPlaceholderText('sign-up.form.placeholders.confirm-password'),
      mockSignUp.confirmPassword + '1234'
    )
    await click(screen.getAllByRole('radio')[0])
    await click(screen.getByRole('button', { name: 'sign-up.form.submit' }))

    await waitFor(() => {
      expect(
        screen.getByText(
          'sign-up.form.errors.passwords-do-not-match.description'
        )
      ).toBeInTheDocument()
      expect(api.post).not.toHaveBeenCalled()
    })
  })
})

function renderSignUpForm(invitationToken?: string) {
  const user = userEvent.setup({ delay: null })
  const renderResult = renderWithProviders(
    <BrowserRouter>
      <SignUpForm invitationToken={invitationToken} />
    </BrowserRouter>
  )
  return { ...renderResult, ...user }
}

const mockSignUp: SignUp = {
  email: 'test@test.com',
  firstName: 'John',
  lastName: 'Doe',
  password: 'test123456',
  confirmPassword: 'test123456',
  gender: 'male',
}
