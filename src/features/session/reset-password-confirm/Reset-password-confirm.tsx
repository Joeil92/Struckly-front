import { useForm } from 'react-hook-form'
import { useResetPasswordConfirmMutation } from './reset-password-confirm.mutation'
import { ResetPasswordConfirm } from './reset-password-confirm.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordConfirmDtoSchema } from '../../../shared/api/api.schemas'
import { FormMessage, Input } from '../../../shared/ui/form'
import { Button } from '../../../shared/ui/button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useToast } from '../../../shared/lib/toast/use-toast'

interface ResetPasswordConfirmFormProps {
  token: string
  userId: string
}

export function ResetPasswordConfirmForm({
  token,
  userId,
}: ResetPasswordConfirmFormProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { addToast } = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm<ResetPasswordConfirm>({
    resolver: zodResolver(resetPasswordConfirmDtoSchema),
    defaultValues: { password: '', token, userId },
  })

  const { isPending, mutate } = useResetPasswordConfirmMutation({
    onSuccess: () => {
      addToast({
        title: t('reset-password-confirm.form.success.title'),
        content: t('reset-password-confirm.form.success.description'),
        variant: 'success',
      })
      navigate('/login')
    },
    onError: (error) => {
      if (error.statusCode === 410) {
        addToast({
          title: t('common.errors.unknown.title'),
          content: t('reset-password-confirm.form.errors.token-expired'),
          variant: 'danger',
        })
      } else {
        addToast({
          title: t('common.errors.unknown.title'),
          content: t('common.errors.unknown.description'),
          variant: 'danger',
        })
      }
    },
  })

  const canSubmit = [isDirty, isValid, !isPending].every(Boolean)

  const onValid = (data: ResetPasswordConfirm) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-8">
      <fieldset disabled={isPending}>
        <Input
          type="password"
          placeholder={t('reset-password-confirm.form.placeholders.password')}
          {...register('password')}
          isError={!!errors.password}
        />
        {errors.password && (
          <FormMessage isError>
            {t(String(errors.password.message))}
          </FormMessage>
        )}
      </fieldset>
      <Button type="submit" disabled={!canSubmit}>
        {t('reset-password-confirm.form.submit')}
      </Button>
    </form>
  )
}
