import api from './api.instance'
import { loginUserDtoSchema } from './api.schemas'
import { LoginUserDto } from './api.types'
import { AxiosRequestConfig } from 'axios'

export function loginUser(
  loginUserDto: LoginUserDto,
  config?: AxiosRequestConfig
) {
  const data = loginUserDtoSchema.parse(loginUserDto)
  return api.post('/auth/login', data, config)
}
