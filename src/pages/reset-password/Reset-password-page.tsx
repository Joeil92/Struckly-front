import { useTranslation } from 'react-i18next'
import { useAuth } from '../../entities/session/session.lib'
import { Navigate } from 'react-router'
import { pathKeys } from '../../shared/consts/router'
import { Card, CardHeader, CardTitle } from '../../shared/ui/card'
import { Typography } from '../../shared/ui/typography'
import { ResetPasswordForm } from '../../features/session/reset-password/Reset-password'
import { useState } from 'react'
import { CircleCheck } from 'lucide-react'
import { Link } from '../../shared/ui/link/Link'

export function ResetPasswordPage() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (isAuthenticated) {
    return <Navigate to={pathKeys.dashboard} />
  }

  return (
    <>
      <title>{t('reset-password.title')}</title>
      <div className="flex h-screen flex-col items-center justify-center gap-8">
        <Typography tag={'h1'}>{t('appName')}</Typography>
        <Card className="w-[450px]">
          <CardHeader className="text-center">
            <CardTitle>{t('reset-password.reset-password-title')}</CardTitle>
          </CardHeader>
          {!isSubmitted ? (
            <>
              <Typography className="text-grey-500">
                {t('reset-password.reset-password-subtitle')}
              </Typography>
              <ResetPasswordForm onSubmit={() => setIsSubmitted(true)} />
            </>
          ) : (
            <div className="text-success-500 flex flex-col items-center gap-8">
              <CircleCheck className="h-[48px] w-[48px]" />
              <Typography tag={'subtitle'} className="text-center">
                {t('reset-password.form.success.text')}
              </Typography>
            </div>
          )}
        </Card>
        <Link href={pathKeys.login} className="text-center">
          {t('reset-password.back-to-login')}
        </Link>
      </div>
    </>
  )
}
