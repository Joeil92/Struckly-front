import { z } from 'zod'
import { loginUserDtoSchema } from '../../../shared/api/api.schemas'

export type LoginUser = z.infer<typeof loginUserDtoSchema>
