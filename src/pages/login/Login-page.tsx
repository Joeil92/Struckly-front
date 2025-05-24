import { useTranslation } from 'react-i18next'
import { Typography } from '../../shared/ui/typography/Typography'
import LoginForm from '../../features/session/login/Login'
import { useAuth } from '../../entities/session/session.lib'
import { Navigate } from 'react-router'
import { pathKeys } from '../../shared/consts/router'
import { Card, CardHeader, CardTitle } from '../../shared/ui/card'

export function LoginPage() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={pathKeys.dashboard} />
  }

  return (
    <>
      <title>{t('login.title')}</title>
      <div className="bg-grey-100 flex h-screen flex-col items-center justify-center gap-8">
        <Typography tag={'h1'}>{t('appName')}</Typography>
        <Card className="w-[450px]">
          <CardHeader className="text-center">
            <CardTitle>{t('login.loginTitle')}</CardTitle>
          </CardHeader>
          <LoginForm />
        </Card>
        <Typography className="text-center whitespace-pre-line" tag={'small'}>
          {t('login.no-account')}
        </Typography>
      </div>
    </>
  )
}
