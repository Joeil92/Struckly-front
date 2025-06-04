import { z } from 'zod'
import { SignUpSchema } from './sign-up.schemas'

export type SignUp = z.infer<typeof SignUpSchema>
