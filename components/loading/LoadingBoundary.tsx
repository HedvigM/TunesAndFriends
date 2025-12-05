"use client";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { LoadingSpinner } from "components/LoadingSpinner";

interface LoadingBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function LoadingBoundary({
  children,
  fallback,
}: LoadingBoundaryProps) {
  return (
    <Suspense fallback={fallback || <LoadingSpinner size="large" />}>{children}</Suspense>
  );
}

