import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const backend = new Backend({
  loadPath: '/public/locales/{{lng}}/{{ns}}.json',
})

i18n
  .use(backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    debug: import.meta.env.VITE_NODE_ENV === 'development',
    ns: 'translation',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
