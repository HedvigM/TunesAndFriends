"use client";

import { Skeleton, SkeletonCircle, SkeletonButton } from "./Skeleton";

export function FriendProfileSkeleton() {
  return (
    <div>
      {/* Back button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px",
        }}
      >
        <SkeletonButton width={80} />
      </div>

      {/* Profile header */}
      <div
        style={{
          padding: "20px 0",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            paddingRight: "10px",
          }}
        >
          <SkeletonCircle size={80} />
          <SkeletonButton width={60} />
        </div>

        {/* Profile info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Skeleton width={150} height="1rem" />
          <div style={{ display: "flex", gap: "20px" }}>
            <Skeleton width={60} height="0.875rem" />
            <Skeleton width={60} height="0.875rem" />
            <Skeleton width={60} height="0.875rem" />
          </div>
        </div>
      </div>

      {/* Tune tabs */}
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <SkeletonButton width={100} />
          <SkeletonButton width={100} />
        </div>

        {/* Tune list */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
            }}
          >
            <Skeleton width="50%" height="1rem" />
            <SkeletonButton width={50} />
          </div>
        ))}
      </div>
    </div>
  );
}

