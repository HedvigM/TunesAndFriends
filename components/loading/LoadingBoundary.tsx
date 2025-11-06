import type { FC, ReactNode } from "react";
import { Suspense } from "react";
import { LoadingSpinner } from "components/LoadingSpinner";

interface LoadingBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const LoadingBoundary: FC<LoadingBoundaryProps> = ({
  children,
  fallback,
}) => {
  return (
    <Suspense fallback={fallback || <LoadingSpinner size="large" />}>{children}</Suspense>
  );
};

