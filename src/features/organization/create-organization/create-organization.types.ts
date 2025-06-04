import { z } from 'zod'
import { CreateOrganizationSchema } from './create-organization.schemas'

export type CreateOrganization = z.infer<typeof CreateOrganizationSchema>
