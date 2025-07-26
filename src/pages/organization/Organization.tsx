import { useTranslation } from 'react-i18next'
import { Tabs, TabsList, TabsTrigger } from '../../shared/ui/tabs'
import { useState } from 'react'
import { Typography } from '../../shared/ui/typography'

export function Organization() {
  const { t } = useTranslation()
  const [tabValue, setTabValue] = useState('organization')

  return (
    <>
      <title>{t('organization.title')}</title>
      <Typography tag={'subtitle'}>{t('organization.subtitle')}</Typography>
      <Tabs value={tabValue} setValue={setTabValue}>
        <TabsList className="w-full">
          <TabsTrigger value="organization">
            {t('organization.tabs.organization')}
          </TabsTrigger>
          <TabsTrigger value="members">
            {t('organization.tabs.members')}
          </TabsTrigger>
          <TabsTrigger value="roles">
            {t('organization.tabs.roles')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  )
}
