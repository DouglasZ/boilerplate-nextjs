import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/themes/defaultTheme';
import 'react-toastify/dist/ReactToastify.min.css';
import NetworkStatus from '../components/NetworkStatus';
import Toast from '../components/Toast';

import GlobalStyle from '../styles/global';

import dynamic from 'next/dynamic';
const I18n = dynamic(() => import('../contexts/I18n'), { ssr: false });
const EnvironmentProvider = dynamic(() => import('../contexts/Environment'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EnvironmentProvider>
      <I18n>
        <ThemeProvider theme={theme}>
          <NetworkStatus />
          <Toast />
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </I18n>
    </EnvironmentProvider>
  );
}

export default MyApp;
