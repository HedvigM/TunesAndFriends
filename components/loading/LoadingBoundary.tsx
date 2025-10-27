import React, { Suspense } from "react";
import { LoadingSkeleton } from "components/loading/LoadingSkeleton";

interface LoadingBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LoadingBoundary: React.FC<LoadingBoundaryProps> = ({
  children,
  fallback,
}) => {
  return (
    <Suspense fallback={fallback || <LoadingSkeleton />}>{children}</Suspense>
  );
};

