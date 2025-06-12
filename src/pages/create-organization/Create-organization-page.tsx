import { Navigate } from 'react-router'
import { useAuth } from '../../entities/session/session.lib'
import { pathKeys } from '../../shared/consts/router'
import { organizationByMeQueryOptions } from '../../entities/organization/organization.api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Typography } from '../../shared/ui/typography'
import { Card } from '../../shared/ui/card'
import { CheckCircle } from 'lucide-react'
import signUp from '../../assets/common/sign-up.svg'
import { CreateOrganizationForm } from '../../features/organization/create-organization/Create-organization'

export function CreateOrganizationPage() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const { data } = useSuspenseQuery(organizationByMeQueryOptions)

  if (!isAuthenticated || data) {
    return <Navigate to={pathKeys.login} />
  }

  return (
    <>
      <title>{t('create-organization.title')}</title>
      <div className="bg-grey-100 flex h-screen flex-col items-center justify-center gap-8">
        <Typography tag={'h1'}>{t('appName')}</Typography>
        <Card className="h-[600px]">
          <div className="flex flex-1 items-center justify-start gap-4">
            <div className="bg-grey-100 flex h-full w-[250px] flex-col items-center rounded-sm p-4">
              <Typography tag={'subtitle'} className="mb-4">
                {t('create-organization.card-info.title')}
              </Typography>
              <ul className="flex list-none flex-col gap-4 text-[12px] leading-[16px]">
                <li className="flex items-center justify-start gap-4">
                  <div>
                    <CheckCircle className="text-success-500 h-6 w-6" />
                  </div>
                  {t('create-organization.card-info.list.item-1')}
                </li>
                <li className="flex items-center justify-start gap-4">
                  <div>
                    <CheckCircle className="text-success-500 h-6 w-6" />
                  </div>
                  {t('create-organization.card-info.list.item-2')}
                </li>
                <li className="flex items-center justify-start gap-4">
                  <div>
                    <CheckCircle className="text-success-500 h-6 w-6" />
                  </div>
                  {t('create-organization.card-info.list.item-3')}
                </li>
              </ul>
              <img
                src={signUp}
                alt="sign_up_illustration"
                className="mt-auto"
                width={150}
              />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-8 py-4 md:max-w-[600px] md:px-16 2xl:max-w-[700px] 2xl:px-24">
              <Typography tag={'h5'} className="text-center">
                {t('create-organization.subtitle')}
              </Typography>
              <CreateOrganizationForm />
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
