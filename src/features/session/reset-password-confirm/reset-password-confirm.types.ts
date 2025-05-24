import { z } from 'zod'
import { resetPasswordConfirmDtoSchema } from '../../../shared/api/api.schemas'

export type ResetPasswordConfirm = z.infer<typeof resetPasswordConfirmDtoSchema>
