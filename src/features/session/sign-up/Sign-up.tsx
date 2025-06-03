import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useAuth } from '../../../entities/session/session.lib'
import { useToast } from '../../../shared/lib/toast/use-toast'
import { useForm } from 'react-hook-form'
import { SignUp } from './sign-up.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignUpMutation } from './sign-up.mutation'
import { FormMessage, Input, Label } from '../../../shared/ui/form'
import { SignUpSchema } from './sign-up.schemas'
import { Button } from '../../../shared/ui/button'
import { Link } from '../../../shared/ui/link/Link'
import { pathKeys } from '../../../shared/consts/router'
import { Radio } from '../../../shared/ui/radio'
import { Gender } from '../../../entities/session/session.types'
import { RadioContainer } from '../../../shared/ui/radio/Radio-container'

export interface SignUpFormProps {
  invitationToken?: string
}

export default function SignUpForm({ invitationToken }: SignUpFormProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { login } = useAuth()
  const { addToast } = useToast()
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm<SignUp>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      gender: 'male',
      invitationToken: invitationToken,
    },
  })

  const { isPending, mutate } = useSignUpMutation({
    onSuccess: (session) => {
      login(session)
      if (!invitationToken) {
        navigate(pathKeys.createOrganization)
      } else {
        navigate(pathKeys.dashboard)
      }
    },
    onError: (error) => {
      if (error.statusCode === 409) {
        setError('email', {
          type: 'custom',
          message: 'sign-up.form.errors.email-already-exists.description',
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

  const onValid = (data: SignUp) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'custom',
        message: 'sign-up.form.errors.passwords-do-not-match.description',
      })
      return
    }
    mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex w-full flex-col gap-8"
    >
      <div className="grid grid-cols-2 gap-4">
        <fieldset disabled={isPending}>
          <Label isError={!!errors.firstName}>
            {t('sign-up.form.labels.firstName')}
          </Label>
          <Input
            placeholder={t('sign-up.form.placeholders.firstName')}
            isError={!!errors.firstName}
            {...register('firstName')}
          />
        </fieldset>
        <fieldset disabled={isPending}>
          <Label isError={!!errors.lastName}>
            {t('sign-up.form.labels.lastName')}
          </Label>
          <Input
            placeholder={t('sign-up.form.placeholders.lastName')}
            isError={!!errors.lastName}
            {...register('lastName')}
          />
        </fieldset>
      </div>
      <fieldset disabled={isPending}>
        <Label isError={!!errors.email}>{t('sign-up.form.labels.email')}</Label>
        <Input
          type="email"
          placeholder={t('sign-up.form.placeholders.email')}
          isError={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <FormMessage isError>{t(String(errors.email.message))}</FormMessage>
        )}
      </fieldset>
      <div className="grid grid-cols-2 gap-4">
        <fieldset disabled={isPending}>
          <Label isError={!!errors.password}>
            {t('sign-up.form.labels.password')}
          </Label>
          <Input
            type="password"
            placeholder={t('sign-up.form.placeholders.password')}
            isError={!!errors.password}
            {...register('password')}
          />
          <FormMessage>{t('sign-up.form.helpers.password')}</FormMessage>
        </fieldset>
        <fieldset disabled={isPending}>
          <Label isError={!!errors.confirmPassword}>
            {t('sign-up.form.labels.confirm-password')}
          </Label>
          <Input
            type="password"
            placeholder={t('sign-up.form.placeholders.confirm-password')}
            isError={!!errors.confirmPassword}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <FormMessage isError>
              {t(String(errors.confirmPassword.message))}
            </FormMessage>
          )}
        </fieldset>
      </div>
      <div className="flex items-center justify-start gap-8">
        <RadioContainer>
          <Radio {...register('gender')} value={Gender.MALE} />
          <Label isError={!!errors.gender}>
            {t('sign-up.form.labels.male')}
          </Label>
        </RadioContainer>
        <RadioContainer>
          <Radio {...register('gender')} value={Gender.FEMALE} />
          <Label isError={!!errors.gender}>
            {t('sign-up.form.labels.female')}
          </Label>
        </RadioContainer>
        <RadioContainer>
          <Radio {...register('gender')} value={Gender.OTHER} />
          <Label isError={!!errors.gender}>
            {t('sign-up.form.labels.other')}
          </Label>
        </RadioContainer>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Button type="submit" disabled={!canSubmit}>
          {t('sign-up.form.submit')}
        </Button>
        <Link href={pathKeys.login}>{t('sign-up.links.login')}</Link>
      </div>
    </form>
  )
}
