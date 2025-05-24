import { z } from 'zod'

export const loginUserDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const refreshUserDtoSchema = z.object({
  refresh_token: z.string(),
})

export const resetPasswordConfirmDtoSchema = z.object({
  token: z.string(),
  userId: z.string().uuid(),
  password: z
    .string()
    .min(8, { message: 'reset-password-confirm.form.errors.too-small' }),
})
