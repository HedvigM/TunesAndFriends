"use client";

import { Skeleton } from "./Skeleton";

function SectionSkeleton({ title, count = 3 }: { title: string; count?: number }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "12px" }}>
        <Skeleton width={120} height="1.25rem" style={{ margin: "0 auto" }} />
      </div>

      {/* Items */}
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            paddingTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Skeleton width="60%" height="1rem" />
        </div>
      ))}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div style={{ padding: "20px" }}>
      <SectionSkeleton title="Newest Friends" count={3} />
      <SectionSkeleton title="Newest Tunes" count={3} />
      <SectionSkeleton title="Friends Newest Tunes" count={3} />
    </div>
  );
}

