import { z } from 'zod'
import { OrganizationByMeSchema } from './organization.schema'

export type OrganizationByMe = z.infer<typeof OrganizationByMeSchema>
