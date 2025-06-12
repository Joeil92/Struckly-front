import { useTranslation } from 'react-i18next'
import { Typography } from '../../shared/ui/typography'
import { ResetPasswordConfirmForm } from '../../features/session/reset-password-confirm/Reset-password-confirm'
import { Navigate, useSearchParams } from 'react-router'
import { pathKeys } from '../../shared/consts/router'
import { useAuth } from '../../entities/session/session.lib'
import { Card, CardHeader, CardTitle } from '../../shared/ui/card'
import { Link } from '../../shared/ui/link/Link'

export function ResetPasswordConfirmPage() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const userId = searchParams.get('userId') ?? ''

  if (isAuthenticated) {
    return <Navigate to={pathKeys.dashboard} />
  }

  if (!token && !userId) {
    return <Navigate to={pathKeys.login} />
  }

  return (
    <>
      <title>{t('reset-password.title')}</title>
      <div className="bg-grey-100 flex h-screen flex-col items-center justify-center gap-8">
        <Typography tag={'h1'}>{t('appName')}</Typography>
        <Card className="w-[450px]">
          <CardHeader className="text-center">
            <CardTitle>{t('reset-password-confirm.formTitle')}</CardTitle>
          </CardHeader>
          <Typography className="text-grey-500">
            {t('reset-password-confirm.formSubtitle')}
          </Typography>
          <ResetPasswordConfirmForm token={token} userId={userId} />
        </Card>
        <Link href={pathKeys.login} className="text-center">
          {t('reset-password-confirm.back-to-login')}
        </Link>
      </div>
    </>
  )
}
