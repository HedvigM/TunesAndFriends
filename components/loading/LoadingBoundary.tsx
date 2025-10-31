import React, { Suspense } from "react";
import { LoadingSpinner } from "components/LoadingSpinner";

interface LoadingBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LoadingBoundary: React.FC<LoadingBoundaryProps> = ({
  children,
  fallback,
}) => {
  return (
    <Suspense fallback={fallback || <LoadingSpinner size="large" />}>{children}</Suspense>
  );
};

