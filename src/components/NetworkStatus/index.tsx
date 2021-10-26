import React, { useState, useEffect } from 'react';

import networkOffline from '../../assets/networkOffline.json';
import { useTranslation } from 'react-i18next';

import { Title, SubTitle, Group, LottieNetworkOffline, BackDrop } from './style';

const NetworkStatus = () => {
  const [online, isOnline] = useState(navigator.onLine);
  const { t } = useTranslation();

  const setOnline = () => {
    isOnline(true);
    console.log('Online');
  };
  const setOffline = () => {
    isOnline(false);
    console.log('Offline');
  };

  useEffect(() => {
    window.addEventListener('offline', setOffline);
    window.addEventListener('online', setOnline);
    return () => {
      window.removeEventListener('offline', setOffline);
      window.removeEventListener('online', setOnline);
    };
  }, []);

  return (
    <>
      {!online && (
        <BackDrop>
          <Group>
            <LottieNetworkOffline animationData={networkOffline} play={true} />
            <Title>{t('networkStatus.title')}</Title>
            <SubTitle>{t('networkStatus.subtitle')}</SubTitle>
          </Group>
        </BackDrop>
      )}
    </>
  );
};

export default NetworkStatus;
