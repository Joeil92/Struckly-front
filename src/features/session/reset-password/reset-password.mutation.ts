import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { resetPassword } from '../../../shared/api/api.service'
import { ResetPassword } from './reset-password.types'

export function useResetPasswordMutation(
  options: Pick<
    UseMutationOptions<unknown, unknown, unknown, unknown>,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {}
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

  return useMutation({
    mutationKey: ['reset-password', ...mutationKey],
    mutationFn: async (resetPasswordDto: ResetPassword) => {
      const { data } = await resetPassword(resetPasswordDto)
      return data
    },
    onMutate,
    onSuccess,
    onError,
    onSettled,
  })
}
