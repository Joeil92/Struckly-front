import { Trans, useTranslation } from 'react-i18next'
import { Typography } from '../../shared/ui/typography'
import { Card } from '../../shared/ui/card'
import { CheckCircle } from 'lucide-react'
import signUp from '../../assets/common/sign-up.svg'
import SignUpForm from '../../features/session/sign-up/Sign-up'
import { Link } from '../../shared/ui/link/Link'
import { useAuth } from '../../entities/session/session.lib'
import { Navigate, useSearchParams } from 'react-router'
import { pathKeys } from '../../shared/consts/router'

export function SignUpPage() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const [searchParams] = useSearchParams()

  const invitationToken = searchParams.get('token') ?? undefined

  if (isAuthenticated) {
    return <Navigate to={pathKeys.dashboard} />
  }

  return (
    <>
      <title>{t('sign-up.title')}</title>
      <div className="flex h-screen flex-col items-center justify-center gap-8">
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
                src={signUp}
                alt="sign_up_illustration"
                className="mt-auto"
                width={150}
              />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-8 py-4 md:max-w-[500px] md:px-16 2xl:max-w-[700px] 2xl:px-24">
              <Typography tag={'h5'} className="text-center">
                {t('sign-up.signUpTitle')}
              </Typography>
              <SignUpForm invitationToken={invitationToken} />
            </div>
          </div>
        </Card>
        <Typography tag={'small'}>
          <Trans
            i18nKey="sign-up.terms"
            components={[<Link href="/terms" />, <Link href="/privacy" />]}
          />
        </Typography>
      </div>
    </>
  )
}
