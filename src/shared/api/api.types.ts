import { z } from 'zod'
import {
  organizationByMeSchema,
  loginUserDtoSchema,
  refreshUserDtoSchema,
  resetPasswordConfirmDtoSchema,
  resetPasswordDtoSchema,
  signUpDtoSchema,
} from './api.schemas'

export type LoginUserDto = z.infer<typeof loginUserDtoSchema>
export type SignUpDto = z.infer<typeof signUpDtoSchema>
export type RefreshUserDto = z.infer<typeof refreshUserDtoSchema>
export type ResetPasswordDto = z.infer<typeof resetPasswordDtoSchema>
export type ResetPasswordConfirmDto = z.infer<
  typeof resetPasswordConfirmDtoSchema
>

export type OrganizationByMe = z.infer<typeof organizationByMeSchema>

export type ApiDataError = {
  statusCode: number
  path: string
  error: string
  timestamp: string
}
