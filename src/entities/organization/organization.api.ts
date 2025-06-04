import { queryOptions } from '@tanstack/react-query'
import { getOrganizationByMe } from '../../shared/api/api.service'
import { queryClient } from '../../shared/utils'
import { OrganizationByMe } from './organization.types'
import { transformOrganizationByMeDtoToOrganizationByMe } from './organization.lib'

export const organizationByMeQueryOptions = queryOptions({
  queryKey: ['organizationByMe'],
  queryFn: async () => {
    const { data } = await getOrganizationByMe()
    const organization = transformOrganizationByMeDtoToOrganizationByMe(data)
    return organization
  },
  initialData: () =>
    queryClient.getQueryData<OrganizationByMe>(['organizationByMe']),
  initialDataUpdatedAt: () =>
    queryClient.getQueryState<OrganizationByMe>(['organizationByMe'])
      ?.dataUpdatedAt,
})
