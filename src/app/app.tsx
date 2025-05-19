import { StrictMode } from 'react'
import { BoostrapedRouter } from './browser-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../shared/utils'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BoostrapedRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  )
}
