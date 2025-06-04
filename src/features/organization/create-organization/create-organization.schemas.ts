import { z } from 'zod'

export const CreateOrganizationSchema = z.object({
  name: z.string().min(1),
  country: z.string().min(1),
  size: z.enum(['1-9', '10-99', '100-499', '500-999', '1000+']),
})
