import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { theme } from 'styles/theme';

import { UserProvider, useUser } from '@auth0/nextjs-auth0';
import { Header } from 'styles/components/Header';
import { Footer } from 'styles/components/Footer';

const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const router = useRouter();

  return (
    <UserProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />
        </Head>
        <ThemeProvider theme={theme}>
          <Header />
          <CssBaseline />
          <Component {...pageProps} key={router.asPath} />
          <Footer />
        </ThemeProvider>
      </CacheProvider>
    </UserProvider>
  );
}

export default MyApp;
