import { queryOptions } from '@tanstack/react-query'
import { getEntreprisesByMe } from '../../shared/api/api.service'
import { queryClient } from '../../shared/utils'
import { EntreprisesByMe } from './entreprise.types'
import { transformEntreprisesByMeDtoToEntreprisesByMe } from './entreprise.lib'

export const entreprisesByMeQueryOptions = queryOptions({
  queryKey: ['entreprisesByMe'],
  queryFn: async () => {
    const { data } = await getEntreprisesByMe()
    const entreprises = transformEntreprisesByMeDtoToEntreprisesByMe(data)
    return entreprises
  },
  initialData: () =>
    queryClient.getQueryData<EntreprisesByMe>(['entreprisesByMe']),
  initialDataUpdatedAt: () =>
    queryClient.getQueryState<EntreprisesByMe>(['entreprisesByMe'])
      ?.dataUpdatedAt,
})
