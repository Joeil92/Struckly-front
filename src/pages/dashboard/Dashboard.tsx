import { useTranslation } from 'react-i18next'
import { Skeleton } from '../../shared/ui/skeleton'

export function Dashboard() {
  const { t } = useTranslation()

  return (
    <>
      <title>{t('dashboard.title')}</title>
      <Skeleton style={'text'} />
    </>
  )
}
