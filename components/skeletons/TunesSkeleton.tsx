"use client";

import { Skeleton, SkeletonButton } from "./Skeleton";

export function TuneListItemSkeleton() {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 0",
      }}
    >
      <div style={{ flex: 1 }}>
        <Skeleton width="70%" height="1rem" />
        <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
          <Skeleton width={40} height={20} borderRadius="5px" />
          <Skeleton width={50} height={20} borderRadius="5px" />
        </div>
      </div>
      <SkeletonButton width={70} />
    </div>
  );
}

export function TunesSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div style={{ padding: "20px" }}>
      {/* Tags filter skeleton */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          paddingBottom: "20px",
        }}
      >
        <Skeleton width={40} height="1rem" />
        <div style={{ display: "flex", gap: "5px" }}>
          <SkeletonButton width={60} />
          <SkeletonButton width={50} />
          <SkeletonButton width={70} />
        </div>
      </div>

      {/* Tune list skeleton */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {Array.from({ length: count }).map((_, i) => (
          <TuneListItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function PopularTunesSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div style={{ padding: "20px" }}>
      {/* Search input skeleton */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <Skeleton width="100%" height="48px" borderRadius="8px" />
        <Skeleton width="100px" height="48px" borderRadius="8px" />
      </div>

      {/* Section header skeleton */}
      <div style={{ marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--color-fourth)" }}>
        <Skeleton width="150px" height="1.25rem" />
        <Skeleton width="250px" height="0.875rem" style={{ marginTop: "8px" }} />
      </div>

      {/* Tune list skeleton */}
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 8px",
            borderBottom: "1px solid var(--color-fourth)",
          }}
        >
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px" }}>
            <Skeleton width="50%" height="1rem" />
            <Skeleton width="50px" height="1.25rem" borderRadius="4px" />
          </div>
          <SkeletonButton width={60} />
        </div>
      ))}
    </div>
  );
}

export function SearchResultsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div>
      {/* Result count skeleton */}
      <Skeleton width="200px" height="0.875rem" style={{ marginBottom: "16px" }} />

      {/* Results skeleton */}
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 8px",
            borderBottom: "1px solid var(--color-fourth)",
          }}
        >
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px" }}>
            <Skeleton width={`${40 + Math.random() * 30}%`} height="1rem" />
            <Skeleton width="50px" height="1.25rem" borderRadius="4px" />
          </div>
          <SkeletonButton width={60} />
        </div>
      ))}
    </div>
  );
}

