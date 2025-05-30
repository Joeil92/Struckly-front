import { z } from 'zod'
import { EntreprisesByMe } from './entreprise.types'
import { entreprisesByMeSchema } from '../../shared/api/api.schemas'

export function transformEntreprisesByMeDtoToEntreprisesByMe(
  data: z.infer<typeof entreprisesByMeSchema>[]
): EntreprisesByMe {
  return data.map((entreprise) => ({
    id: entreprise.id,
    name: entreprise.name,
    logoUrl: entreprise.logoUrl || '',
    membersCount: entreprise.membersCount,
  }))
}
