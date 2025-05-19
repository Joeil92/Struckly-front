import { z } from 'zod'
import { loginUserDtoSchema } from './api.schemas'

export type LoginUserDto = z.infer<typeof loginUserDtoSchema>
