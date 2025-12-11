"use client";

import { Skeleton, SkeletonButton } from "./Skeleton";

export function TuneDetailSkeleton() {
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <SkeletonButton width={80} />
      </div>

      <Skeleton width="60%" height="1.5rem" />

      <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
        <Skeleton width={50} height="1rem" />
        <Skeleton width={80} height="1rem" />
      </div>

      <div style={{ marginTop: "16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Skeleton width={70} height="1rem" />
        <Skeleton width={60} height="1rem" />
        <Skeleton width={50} height="1rem" />
        <Skeleton width={70} height="1rem" />
      </div>

      <div
        style={{
          marginTop: "24px",
          padding: "20px",
          backgroundColor: "var(--color-fourth)",
          borderRadius: "8px",
          minHeight: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Skeleton width={200} height="1rem" />
      </div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <SkeletonButton width={120} />
      </div>
    </div>
  );
}

