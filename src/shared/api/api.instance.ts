import axios from 'axios'
import { AUTH_TOKENS_KEY } from '../consts/auth'
import { ApiDataError } from './api.types'

export const api = axios.create({ baseURL: import.meta.env.VITE_URL_API })

// Auth interceptor
api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(
      localStorage.getItem(AUTH_TOKENS_KEY) || '{}'
    ).access_token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error)
    }

    return Promise.reject(error.response?.data as ApiDataError)
  }
)

export default api
