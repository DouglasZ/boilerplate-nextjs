import React, { memo, useEffect } from 'react';

import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import pt from '../../locales/I18n/pt-BR.json';
import en from '../../locales/I18n/en.json';
import es from '../../locales/I18n/es.json';

const resources = {
  pt: {
    translation: pt,
  },
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

const I18n = memo(({ children }) => {
  const locale = navigator && navigator.language;
  const language = locale.substring(0, 2);

  i18n.use(initReactI18next).init({
    detection: { order: ['path', 'navigator'] },
    resources,
    lng: language,
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return <>{children}</>;
});

I18n.displayName = 'I18n';

export default I18n;
