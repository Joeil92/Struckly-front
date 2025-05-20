import { z } from 'zod'

export const loginUserDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const refreshUserDtoSchema = z.object({
  refresh_token: z.string(),
})
