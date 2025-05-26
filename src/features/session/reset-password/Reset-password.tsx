import { useForm } from 'react-hook-form'
import { ResetPassword } from './reset-password.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordDtoSchema } from '../../../shared/api/api.schemas'
import { useResetPasswordMutation } from './reset-password.mutation'
import { Input } from '../../../shared/ui/form'
import { Button } from '../../../shared/ui/button'
import { useTranslation } from 'react-i18next'
import { useToast } from '../../../shared/lib/toast/use-toast'

interface ResetPasswordFormProps {
  onSubmit: () => void
}

export function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  const { t } = useTranslation()
  const { addToast } = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm<ResetPassword>({
    resolver: zodResolver(resetPasswordDtoSchema),
    defaultValues: {
      email: '',
    },
  })

  const { isPending, mutate } = useResetPasswordMutation({
    onSuccess: () => {
      onSubmit()
    },
    onError: () => {
      addToast({
        title: t('common.error.unknown'),
        content: t('common.error.unknown-description'),
        variant: 'danger',
      })
    },
  })

  const canSubmit = [isDirty, isValid, !isPending].every(Boolean)

  const onValid = (data: ResetPassword) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-8">
      <fieldset className="gap-1" disabled={isPending}>
        <Input
          isError={!!errors.email}
          placeholder={t('reset-password.form.placeholders.email')}
          {...register('email')}
        />
      </fieldset>
      <Button type="submit" disabled={!canSubmit}>
        {t('reset-password.form.submit')}
      </Button>
    </form>
  )
}
