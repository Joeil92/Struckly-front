import { z } from 'zod'
import { EntreprisesByMeSchema } from './entreprise.schema'

export type EntreprisesByMe = z.infer<typeof EntreprisesByMeSchema>
