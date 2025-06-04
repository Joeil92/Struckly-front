import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import ToastProvider from '../toast/Toast.provider'
import AuthProvider from '../../../entities/session/session.model'

export function renderWithProviders(ui: React.ReactElement) {
  const queryClient = createTestQueryClient()
  return render(
    <ToastProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
      </AuthProvider>
    </ToastProvider>
  )
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
}
