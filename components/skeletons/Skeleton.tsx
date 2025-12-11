"use client";

import styles from "./skeleton.module.scss";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

export function Skeleton({
  width = "100%",
  height = "1rem",
  borderRadius = "4px",
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        borderRadius,
      }}
    />
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className={styles.textContainer}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? "60%" : "100%"}
          height="0.875rem"
        />
      ))}
    </div>
  );
}

export function SkeletonCircle({ size = 48 }: { size?: number }) {
  return <Skeleton width={size} height={size} borderRadius="50%" />;
}

export function SkeletonButton({ width = 80 }: { width?: number }) {
  return <Skeleton width={width} height={36} borderRadius="6px" />;
}

