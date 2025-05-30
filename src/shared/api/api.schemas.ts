import { z } from 'zod'

export const loginUserDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const refreshUserDtoSchema = z.object({
  refresh_token: z.string(),
})

export const resetPasswordDtoSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordConfirmDtoSchema = z.object({
  token: z.string(),
  userId: z.string().uuid(),
  password: z
    .string()
    .min(8, { message: 'reset-password-confirm.form.errors.too-small' }),
})

export const entreprisesByMeSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  logoUrl: z.string().url().nullable(),
  membersCount: z.number(),
})
