import { z } from 'zod'
import {
  entreprisesByMeSchema,
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

export type EntreprisesByMe = z.infer<typeof entreprisesByMeSchema>

export type ApiDataError = {
  statusCode: number
  path: string
  error: string
  timestamp: string
}
