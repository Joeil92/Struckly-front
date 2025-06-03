import { z } from 'zod'

export const OrganizationByMeSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  logoUrl: z.string(),
  membersCount: z.number(),
})
