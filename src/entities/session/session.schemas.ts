import { z } from 'zod'

export const tokensSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
})

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  avatarUrl: z.string().url().nullable(),
  roles: z.array(z.enum(['ROLE_USER', 'ROLE_ADMIN'])),
})
