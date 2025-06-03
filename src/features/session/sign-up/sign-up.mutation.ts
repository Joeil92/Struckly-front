import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ApiDataError } from '../../../shared/api/api.types'
import { Tokens } from '../../../entities/session/session.types'
import { SignUp } from './sign-up.types'
import { signUp } from '../../../shared/api/api.service'

export function useSignUpMutation(
  options: Pick<
    UseMutationOptions<Tokens, ApiDataError, SignUp, unknown>,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {}
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

  return useMutation({
    mutationKey: ['session', 'sign-up', ...mutationKey],
    mutationFn: async (user: SignUp) => {
      const { data } = await signUp(user)
      return data
    },
    onMutate,
    onSuccess,
    onError,
    onSettled,
  })
}
