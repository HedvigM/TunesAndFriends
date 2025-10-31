import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { UserProvider } from "@auth0/nextjs-auth0";
import { MyAppProps } from "types/types";
import { ErrorBoundary } from "components/errors/ErrorBoundary";
import { ErrorFallback } from "components/errors/ErrorFallback";
import "./app/global.scss";

function MyApp({
  Component,
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
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
          </Head>
            <Component {...pageProps} key={router.asPath} />
      </UserProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
