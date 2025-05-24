import { z } from 'zod'
import { resetPasswordDtoSchema } from '../../../shared/api/api.schemas'

export type ResetPassword = z.infer<typeof resetPasswordDtoSchema>
