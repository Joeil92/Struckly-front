import { useTranslation } from 'react-i18next'

export function Organization() {
  const { t } = useTranslation()

  return (
    <>
      <title>{t('organization.title')}</title>
    </>
  )
}
