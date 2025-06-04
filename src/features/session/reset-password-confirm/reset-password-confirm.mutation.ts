import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ApiDataError } from '../../../shared/api/api.types'
import { ResetPasswordConfirm } from './reset-password-confirm.types'
import { resetPasswordConfirm } from '../../../shared/api/api.service'

export function useResetPasswordConfirmMutation(
  options: Pick<
    UseMutationOptions<
      { message: string },
      ApiDataError,
      ResetPasswordConfirm,
      unknown
    >,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  >
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

  return useMutation({
    mutationKey: ['reset-password-confirm', ...mutationKey],
    mutationFn: async (resetPassword: ResetPasswordConfirm) => {
      const { data } = await resetPasswordConfirm(resetPassword)
      return data
    },
    onMutate,
    onSuccess,
    onError,
    onSettled,
  })
}
