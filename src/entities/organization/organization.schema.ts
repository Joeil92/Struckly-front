import { z } from 'zod'

export const OrganizationSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  country: z.string(),
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
  phoneNumber: z.string(),
  website: z.string(),
  logoUrl: z.string(),
  size: z.enum(['1-9', '10-99', '100-499', '500-999', '1000+']),
  updatedAt: z.string(),
  createdAt: z.string(),
})

export const OrganizationByMeSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  logoUrl: z.string(),
  membersCount: z.number(),
})
