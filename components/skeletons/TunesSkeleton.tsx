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
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 0",
            borderBottom: "1px solid var(--color-fourth)",
          }}
        >
          <div style={{ flex: 1 }}>
            <Skeleton width="60%" height="1rem" />
            <Skeleton width="30%" height="0.75rem" style={{ marginTop: "4px" }} />
          </div>
          <SkeletonButton width={60} />
        </div>
      ))}
    </div>
  );
}

