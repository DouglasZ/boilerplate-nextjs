import React from 'react';
import { useTranslation } from 'react-i18next';

function Main() {
  const { t } = useTranslation();

  return <h2>{t('label.boilerplate')}</h2>;
}

export default Main;
