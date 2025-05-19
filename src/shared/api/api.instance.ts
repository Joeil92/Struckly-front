import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_URL_API })

// Auth interceptor
api.interceptors.request.use(
  (config) => {
    const token = '' // Get token from user context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
