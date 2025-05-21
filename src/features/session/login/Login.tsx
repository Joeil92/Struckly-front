import { useForm } from 'react-hook-form'
import { LoginUser } from './login.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginUserDtoSchema } from '../../../shared/api/api.schemas'
import { FormMessage, Input, Label } from '../../../shared/ui/form'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../shared/ui/button'
import { useLoginMutation } from './login.mutations'
import { pathKeys } from '../../../shared/consts/router'
import { useNavigate } from 'react-router'
import { useAuth } from '../../../entities/session/session.lib'
import { useToast } from '../../../shared/lib/toast/use-toast'

export default function LoginForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { login } = useAuth()
  const { addToast } = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginUser>({
    resolver: zodResolver(loginUserDtoSchema),
    defaultValues: { email: '', password: '' },
  })

  const { isPending, mutate } = useLoginMutation({
    onSuccess(session) {
      login(session)
      navigate(pathKeys.dashboard)
    },
    onError(error) {
      if (error.statusCode === 401 || error.statusCode === 404) {
        addToast({
          title: t('login.form.error.invalid'),
          content: t('login.form.error.invalid-description'),
          variant: 'danger',
        })
      } else {
        addToast({
          title: t('common.error.unknown'),
          content: t('common.error.unknown-description'),
          variant: 'danger',
        })
      }
    },
  })
  const canSubmit = [isDirty, isValid, !isPending].every(Boolean)

  const onValid = (data: LoginUser) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-8">
      <fieldset className="gap-1" disabled={isPending}>
        <Label isError={!!errors.email}>{t('login.form.email')}</Label>
        <Input
          isError={!!errors.email}
          placeholder={t('login.form.email')}
          {...register('email')}
        />
      </fieldset>
      <fieldset className="gap-1" disabled={isPending}>
        <Label isError={!!errors.password}>{t('login.form.password')}</Label>
        <Input
          isError={!!errors.password}
          type="password"
          placeholder="••••••"
          {...register('password')}
        />
        <FormMessage className="text-primary-500">
          <a href={pathKeys.resetPassword}>{t('login.form.password-help')}</a>
        </FormMessage>
      </fieldset>
      <Button type="submit" disabled={!canSubmit}>
        {t('login.form.submit')}
      </Button>
    </form>
  )
}
