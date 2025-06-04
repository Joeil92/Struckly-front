import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ApiDataError } from '../../../shared/api/api.types'
import { createOrganization } from '../../../shared/api/api.service'
import { CreateOrganization } from './create-organization.types'
import { Organization } from '../../../entities/organization/organization.types'
import { queryClient } from '../../../shared/utils'

export function useCreateOrganizationMutation(
  options: Pick<
    UseMutationOptions<Organization, ApiDataError, CreateOrganization, unknown>,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {}
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

  return useMutation({
    mutationKey: ['organization', 'create', ...mutationKey],
    mutationFn: async (organization: CreateOrganization) => {
      const { data } = await createOrganization(organization)
      return data
    },
    onMutate,
    onSuccess: async (data, variables, context) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['organizationByMe'] }),
        onSuccess?.(data, variables, context),
      ])
    },
    onError,
    onSettled,
  })
}
