import { z } from 'zod'
import { OrganizationByMe } from './organization.types'
import { organizationByMeDtoSchema } from '../../shared/api/api.schemas'

export function transformOrganizationByMeDtoToOrganizationByMe(
  data: z.infer<typeof organizationByMeDtoSchema> | null
): OrganizationByMe | null {
  if (!data) return null

  return {
    id: data.id,
    name: data.name,
    logoUrl: data.logoUrl || '',
    membersCount: data.membersCount,
  }
}
