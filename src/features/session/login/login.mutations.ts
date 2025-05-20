import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query'
import { LoginUser } from './login.types'
import { loginUser } from '../../../shared/api/api.service'
import { Tokens } from '../../../entities/session/session.types'

export function useLoginMutation(
  options: Pick<
    UseMutationOptions<Tokens, DefaultError, LoginUser, unknown>,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {}
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

  return useMutation({
    mutationKey: ['session', 'login', ...mutationKey],
    mutationFn: async (user: LoginUser) => {
      const { data } = await loginUser(user)
      return data
    },
    onMutate,
    onSuccess,
    onError,
    onSettled,
  })
}
