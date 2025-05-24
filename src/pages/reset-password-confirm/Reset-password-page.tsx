import { useTranslation } from 'react-i18next'
import { Typography } from '../../shared/ui/typography'
import { ResetPasswordConfirmForm } from '../../features/session/reset-password-confirm/Reset-password-confirm'
import { Navigate, useSearchParams } from 'react-router'
import { pathKeys } from '../../shared/consts/router'
import { useAuth } from '../../entities/session/session.lib'

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
      <Typography tag={'h1'} className="fixed ps-[50px] pt-[50px]">
        Struckly
      </Typography>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex grow items-center justify-center">
          <div className="flex w-[50%] flex-col gap-4">
            <Typography tag={'h5'}>
              {t('reset-password-confirm.formTitle')}
            </Typography>
            <Typography className="text-grey-500">
              {t('reset-password-confirm.formSubtitle')}
            </Typography>
            <ResetPasswordConfirmForm token={token} userId={userId} />
          </div>
        </div>
        <div className="from-primary-300 via-primary-500 to-primary-600 h-screen grow-4 bg-gradient-to-b"></div>
      </div>
    </>
  )
}
