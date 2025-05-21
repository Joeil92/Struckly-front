import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import ToastProvider from '../toast/Toast.provider'

export function renderWithProviders(ui: React.ReactElement) {
  const queryClient = createTestQueryClient()
  return render(
    <ToastProvider>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
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
