"use client";

import { useEffect } from "react";
import { ErrorFallback } from "components/errors/ErrorFallback";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("App Router error:", error);
    // TODO: Integrate with Sentry/LogRocket
    // Sentry.captureException(error);
  }, [error]);

  return (
    <ErrorFallback 
      error={error} 
      errorInfo={null} 
      resetError={reset}
    />
  );
}

