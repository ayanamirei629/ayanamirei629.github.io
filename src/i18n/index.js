import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import zh from './zh.json';

let language = 'en';
try {
  const saved = localStorage.getItem('portfolio-language');
  if (saved === 'en' || saved === 'zh') language = saved;
} catch { /* The page also works when browser storage is unavailable. */ }

const syncLanguage = lang => {
  document.documentElement.lang = lang;
  try { localStorage.setItem('portfolio-language', lang); } catch { /* Optional preference. */ }
};
i18n.on('languageChanged', syncLanguage);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: language,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
