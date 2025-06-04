import { z } from 'zod'
import {
  organizationByMeDtoSchema,
  loginUserDtoSchema,
  refreshUserDtoSchema,
  resetPasswordConfirmDtoSchema,
  resetPasswordDtoSchema,
  signUpDtoSchema,
  organizationDtoSchema,
} from './api.schemas'

export type LoginUserDto = z.infer<typeof loginUserDtoSchema>
export type SignUpDto = z.infer<typeof signUpDtoSchema>
export type RefreshUserDto = z.infer<typeof refreshUserDtoSchema>
export type ResetPasswordDto = z.infer<typeof resetPasswordDtoSchema>
export type ResetPasswordConfirmDto = z.infer<
  typeof resetPasswordConfirmDtoSchema
>

export type OrganizationDto = z.infer<typeof organizationDtoSchema>
export type OrganizationByMeDto = z.infer<typeof organizationByMeDtoSchema>

export type ApiDataError = {
  statusCode: number
  path: string
  error: string
  timestamp: string
}
