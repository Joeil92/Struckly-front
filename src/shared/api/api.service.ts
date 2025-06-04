import api from './api.instance'
import {
  loginUserDtoSchema,
  organizationDtoSchema,
  refreshUserDtoSchema,
  resetPasswordConfirmDtoSchema,
  resetPasswordDtoSchema,
  signUpDtoSchema,
} from './api.schemas'
import {
  LoginUserDto,
  OrganizationDto,
  RefreshUserDto,
  ResetPasswordConfirmDto,
  ResetPasswordDto,
  SignUpDto,
} from './api.types'
import { AxiosRequestConfig } from 'axios'

export function loginUser(
  loginUserDto: LoginUserDto,
  config?: AxiosRequestConfig
) {
  const data = loginUserDtoSchema.parse(loginUserDto)
  return api.post('/auth/login', data, config)
}

export function signUp(signUpDto: SignUpDto, config?: AxiosRequestConfig) {
  const data = signUpDtoSchema.parse(signUpDto)
  return api.post('/users', data, config)
}

export function refreshUser(
  refreshUserDto: RefreshUserDto,
  config?: AxiosRequestConfig
) {
  const data = refreshUserDtoSchema.parse(refreshUserDto)
  return api.post('/auth/refresh', data, config)
}

export function resetPassword(
  resetPasswordDto: ResetPasswordDto,
  config?: AxiosRequestConfig
) {
  const data = resetPasswordDtoSchema.parse(resetPasswordDto)
  return api.post('/users/reset-password', data, config)
}

export function resetPasswordConfirm(
  resetPasswordConfirmDto: ResetPasswordConfirmDto,
  config?: AxiosRequestConfig
) {
  const data = resetPasswordConfirmDtoSchema.parse(resetPasswordConfirmDto)
  return api.patch('/users/reset-password/confirm', data, config)
}

export function createOrganization(
  organizationDto: OrganizationDto,
  config?: AxiosRequestConfig
) {
  const data = organizationDtoSchema.parse(organizationDto)
  return api.post('/organizations', data, config)
}

export function getOrganizationByMe(config?: AxiosRequestConfig) {
  return api.get('/organizations/me', config)
}
