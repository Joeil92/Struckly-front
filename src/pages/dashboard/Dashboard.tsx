import { useTranslation } from 'react-i18next'

export function Dashboard() {
  const { t } = useTranslation()

  return (
    <>
      <title>{t('dashboard.title')}</title>
    </>
  )
}
