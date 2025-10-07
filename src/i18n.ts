import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from '../public/locales/en/translation.json';
import translationTR from '../public/locales/tr/translation.json';


const resources = {
  en: {
    translation: translationEN,
    type: "en-EN",
  },
  tr: {
    translation: translationTR,
    type: "tr-TR",
  },
};

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
  resources,
  lng: navigator.language,
  supportedLngs: ['tr', 'en'],
  fallbackLng: "tr", 

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;