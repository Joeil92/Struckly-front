import api from './api.instance'
import { loginUserDtoSchema, refreshUserDtoSchema } from './api.schemas'
import { LoginUserDto, RefreshUserDto } from './api.types'
import { AxiosRequestConfig } from 'axios'

export function loginUser(
  loginUserDto: LoginUserDto,
  config?: AxiosRequestConfig
) {
  const data = loginUserDtoSchema.parse(loginUserDto)
  return api.post('/auth/login', data, config)
}

export function refreshUser(
  refreshUserDto: RefreshUserDto,
  config?: AxiosRequestConfig
) {
  const data = refreshUserDtoSchema.parse(refreshUserDto)
  return api.post('/auth/refresh', data, config)
}
