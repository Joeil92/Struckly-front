import { z } from 'zod'
import {
  loginUserDtoSchema,
  refreshUserDtoSchema,
  resetPasswordConfirmDtoSchema,
  resetPasswordDtoSchema,
} from './api.schemas'

export type LoginUserDto = z.infer<typeof loginUserDtoSchema>
export type RefreshUserDto = z.infer<typeof refreshUserDtoSchema>
export type ResetPasswordDto = z.infer<typeof resetPasswordDtoSchema>
export type ResetPasswordConfirmDto = z.infer<
  typeof resetPasswordConfirmDtoSchema
>

export type ApiDataError = {
  statusCode: number
  path: string
  error: string
  timestamp: string
}
