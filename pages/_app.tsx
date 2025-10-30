import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { theme } from "styles/theme";

import { UserProvider } from "@auth0/nextjs-auth0";
import { MyAppProps } from "types/types";
import { ErrorBoundary } from "components/errors/ErrorBoundary";
import { ErrorFallback } from "components/errors/ErrorFallback";
import "./app/global.scss";

const clientSideEmotionCache = createCache({ key: "css", prepend: true });
function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const router = useRouter();

  return (
    <ErrorBoundary
      fallback={<ErrorFallback error={null} errorInfo={null} />}
      onError={(error, errorInfo) => {
        // Log to error tracking service in production
        console.error("App-level error:", error, errorInfo);
        // TODO: Integrate with Sentry/LogRocket
        // Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
      }}
    >
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
    </ErrorBoundary>
  );
}

export default MyApp;
