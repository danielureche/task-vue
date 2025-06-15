import { createI18n } from 'vue-i18n'
import es from '@/i18n/locales/es.json'
import en from '@/i18n/locales/en.json'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'es',
    messages: {
        es,
        en
    },
    escapeParameterHtml: true
})

export default i18n
