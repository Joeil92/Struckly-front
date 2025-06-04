import { describe, expect, it, Mock } from 'vitest'
import { CreateOrganization } from './create-organization.types'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../shared/lib/test/test.lib'
import { BrowserRouter } from 'react-router'
import { CreateOrganizationForm } from './Create-organization'
import { screen, waitFor } from '@testing-library/dom'
import selectEvent from 'react-select-event'
import api from '../../../shared/api/api.instance'

describe('CreateOrganizationForm', () => {
  it('should render create organization form', async () => {
    renderCreateOrganizationForm()

    expect(
      screen.getByPlaceholderText('create-organization.form.placeholders.name')
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(
        'create-organization.form.placeholders.country'
      )
    ).toBeInTheDocument()
    await selectEvent.select(
      screen.getByLabelText('create-organization.form.labels.size'),
      mockCreateOrganization.size
    )
    expect(screen.getByText(mockCreateOrganization.size)).toBeInTheDocument()
    expect(
      screen.getByText('create-organization.form.submit')
    ).toBeInTheDocument()
  })

  it('should call create organization mutation when form is submitted', async () => {
    ;(api.post as Mock).mockResolvedValue({})

    const mockRequest = (api.post as Mock).mockResolvedValue({})
    const { type, click } = renderCreateOrganizationForm()

    await type(
      screen.getByPlaceholderText('create-organization.form.placeholders.name'),
      mockCreateOrganization.name
    )
    await type(
      screen.getByPlaceholderText(
        'create-organization.form.placeholders.country'
      ),
      mockCreateOrganization.country
    )
    await selectEvent.select(
      screen.getByLabelText('create-organization.form.labels.size'),
      mockCreateOrganization.size
    )
    await click(
      screen.getByRole('button', { name: 'create-organization.form.submit' })
    )
    await waitFor(() => expect(mockRequest).toHaveBeenCalled())
  })

  it('should display error message when create organization failure', async () => {
    ;(api.post as Mock).mockImplementation(() =>
      Promise.reject({ statusCode: 400 })
    )

    const { type, click } = renderCreateOrganizationForm()

    await type(
      screen.getByPlaceholderText('create-organization.form.placeholders.name'),
      mockCreateOrganization.name
    )
    await type(
      screen.getByPlaceholderText(
        'create-organization.form.placeholders.country'
      ),
      mockCreateOrganization.country
    )
    await selectEvent.select(
      screen.getByLabelText('create-organization.form.labels.size'),
      mockCreateOrganization.size
    )
    await click(
      screen.getByRole('button', { name: 'create-organization.form.submit' })
    )

    await waitFor(() => expect(screen.getAllByRole('alert')).toHaveLength(1))
  })
})

function renderCreateOrganizationForm() {
  const user = userEvent.setup({ delay: null })
  const renderResult = renderWithProviders(
    <BrowserRouter>
      <CreateOrganizationForm />
    </BrowserRouter>
  )
  return { ...renderResult, ...user }
}

const mockCreateOrganization: CreateOrganization = {
  name: 'Organization',
  country: 'France',
  size: '1-9',
}
