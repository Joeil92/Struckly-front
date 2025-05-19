import { useTranslation } from 'react-i18next'
import { Typography } from '../../shared/ui/typography/Typography'
import LoginForm from '../../features/session/login/Login'

export function LoginPage() {
  const { t } = useTranslation()

  return (
    <>
      <title>{t('login.title')}</title>
      <Typography tag={'h1'} className="fixed ps-[50px] pt-[50px]">
        Struckly
      </Typography>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex grow items-center justify-center">
          <div className="flex w-[50%] flex-col gap-4">
            <Typography tag={'h5'}>{t('login.loginTitle')}</Typography>
            <Typography className="text-grey-500">
              {t('login.loginSubtitle')}
            </Typography>
            <LoginForm />
          </div>
        </div>
        <div className="from-primary-300 via-primary-500 to-primary-600 h-screen grow-4 bg-gradient-to-b"></div>
      </div>
    </>
  )
}
