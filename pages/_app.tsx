import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { theme } from "styles/theme";

import { UserProvider } from "@auth0/nextjs-auth0";

const clientSideEmotionCache = createCache({ key: "css", prepend: true });

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
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} key={router.asPath} />
        </ThemeProvider>
      </CacheProvider>
    </UserProvider>
  );
}

export default MyApp;
