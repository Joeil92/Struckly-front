import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Api instance mock
vi.mock('../../api/api.instance', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      patch: vi.fn(),
      request: vi.fn(),
      interceptors: {
        request: {
          use: vi.fn(),
        },
        response: {
          use: vi.fn(),
        },
      },
    },
  }
})

// I18n instance mock
vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (i18nKey: string) => i18nKey,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
  initReactI18next: {
    typpe: '3rdParty',
    init: () => {},
  },
}))

// React Router mock
type ReactRouterDom = typeof import('react-router')
vi.mock('react-router', async (importOriginal) => {
  const originalModule = await importOriginal<ReactRouterDom>()
  return {
    ...originalModule,
    useNavigate: vi.fn().mockImplementation(originalModule.useNavigate),
    useLocation: vi.fn().mockImplementation(originalModule.useLocation),
  }
})

// Auth instance mock
vi.mock('../../../entities/session/session.lib', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  const actual = await importOriginal<Object>()
  return {
    ...actual,
    useAuth: () => {
      return {
        isAuthenticated: false,
        user: null,
        login: vi.fn(),
        logout: vi.fn(),
      }
    },
  }
})

afterEach(() => {
  vi.clearAllMocks()
  cleanup()
})
