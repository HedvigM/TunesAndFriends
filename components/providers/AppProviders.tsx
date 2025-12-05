"use client";

/**
 * App Providers Component
 * 
 * Wraps the app with providers that need to be client components.
 * This is used in the root layout to provide error boundary protection
 * and authentication context for client components.
 */

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ErrorBoundary } from "components/errors/ErrorBoundary";
import { ErrorFallback } from "components/errors/ErrorFallback";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
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
        {children}
      </UserProvider>
    </ErrorBoundary>
  );
}

