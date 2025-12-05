"use client";

import { useState } from "react";
import { TuneObject } from "types/tune";
import { TuneListWithTags } from "components/TuneListWithTag";
import { Button } from "styles/Button";

interface MyTunesClientProps {
  tuneObjects: TuneObject[];
  tags: { id: number; name: string }[];
  userId: number;
}

export function MyTunesClient({ tuneObjects, tags, userId }: MyTunesClientProps) {
  const [sortTag, setSortTag] = useState("");
  const filteredTunes = tuneObjects.filter(
    (tune) => !sortTag || tune.tags?.some((tag) => tag.name === sortTag)
  );

  return (
    <div
      style={{
        padding: "20px 20px 0px 20px",
        height: "100%",
      }}
    >
      <div
        style={{
          paddingBottom: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "12px", fontWeight: "bold" }}>Tags:</p>
        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          {tags.map((tag) => (
            <Button
              active={tag.name === sortTag}
              key={tag.id}
              onClick={() => setSortTag(tag.name === sortTag ? "" : tag.name)}
            >
              {tag.name}
            </Button>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "2px",
        }}
      >
        {filteredTunes.map((tune) => (
          <TuneListWithTags key={tune.sessionId} tune={tune} sortTag={sortTag} userId={userId} />
        ))}
      </div>
    </div>
  );
}

