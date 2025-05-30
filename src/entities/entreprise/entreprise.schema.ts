import { z } from 'zod'

export const EntrepriseByMeSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  logoUrl: z.string(),
  membersCount: z.number(),
})

export const EntreprisesByMeSchema = z.array(EntrepriseByMeSchema)
