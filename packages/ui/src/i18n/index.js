import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.js'
import zh from './locales/zh.js'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en
            },
            zh: {
                translation: zh
            }
        },
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false
        }
    })

export default i18n 