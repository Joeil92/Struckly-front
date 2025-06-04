import { z } from 'zod'
import {
  OrganizationByMeSchema,
  OrganizationSchema,
} from './organization.schema'

export type Organization = z.infer<typeof OrganizationSchema>
export type OrganizationByMe = z.infer<typeof OrganizationByMeSchema>
