import { z } from 'zod'
import { loginUserDtoSchema, refreshUserDtoSchema } from './api.schemas'

export type LoginUserDto = z.infer<typeof loginUserDtoSchema>
export type RefreshUserDto = z.infer<typeof refreshUserDtoSchema>

export type ApiDataError = {
  statusCode: number
  path: string
  error: string
  timestamp: string
}
