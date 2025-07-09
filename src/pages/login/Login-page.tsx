import { useTranslation } from 'react-i18next'
import { Typography } from '../../shared/ui/typography/Typography'
import LoginForm from '../../features/session/login/Login'
import { useAuth } from '../../entities/session/session.lib'
import { Navigate } from 'react-router'
import { pathKeys } from '../../shared/consts/router'
import { Card } from '../../shared/ui/card'
import { CheckCircle } from 'lucide-react'
import { Link } from '../../shared/ui/link/Link'
import welcome from '../../assets/common/welcome.svg'

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
        <Card className="md:h-[500px] 2xl:h-[600px]">
          <div className="flex flex-1 items-center justify-start gap-4">
            <div className="bg-grey-100 flex h-full w-[250px] flex-col items-center rounded-sm p-4">
              <Typography tag={'subtitle'} className="mb-4">
                {t('login.card-info.title')}
              </Typography>
              <ul className="flex list-none flex-col gap-4 text-[12px] leading-[16px]">
                <li className="flex items-center justify-start gap-4">
                  <div>
                    <CheckCircle className="text-success-500 h-6 w-6" />
                  </div>
                  {t('login.card-info.list.item-1')}
                </li>
                <li className="flex items-center justify-start gap-4">
                  <div>
                    <CheckCircle className="text-success-500 h-6 w-6" />
                  </div>
                  {t('login.card-info.list.item-2')}
                </li>
                <li className="flex items-center justify-start gap-4">
                  <div>
                    <CheckCircle className="text-success-500 h-6 w-6" />
                  </div>
                  {t('login.card-info.list.item-3')}
                </li>
              </ul>
              <img
                src={welcome}
                alt="welcome_illustration"
                className="mt-auto"
                width={150}
              />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-8 py-4 md:min-w-[450px] md:px-16 2xl:min-w-[650px] 2xl:px-24">
              <Typography tag={'h5'} className="text-center">
                {t('login.loginTitle')}
              </Typography>
              <LoginForm />
            </div>
          </div>
        </Card>
        <Link href={pathKeys.signUp} className="text-center">
          {t('login.no-account')}
        </Link>
      </div>
    </>
  )
}
