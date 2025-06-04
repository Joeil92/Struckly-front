import { z } from 'zod'

export const SignUpSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  gender: z.enum(['male', 'female', 'other']),
  invitationToken: z.string().optional(),
})
