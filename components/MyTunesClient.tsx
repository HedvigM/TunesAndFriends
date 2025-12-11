"use client";

import { useState, useEffect } from "react";
import { TuneObject } from "types/tune";
import { TuneListWithTags } from "components/TuneListWithTag";
import { ClientPagination } from "components/ClientPagination";
import { Button } from "styles/Button";

const TUNES_PER_PAGE = 10;

interface MyTunesClientProps {
  tuneObjects: TuneObject[];
  tags: { id: number; name: string }[];
  userId: number;
}

export function MyTunesClient({ tuneObjects, tags, userId }: MyTunesClientProps) {
  const [sortTag, setSortTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter tunes by tag
  const filteredTunes = tuneObjects.filter(
    (tune) => !sortTag || tune.tags?.some((tag) => tag.name === sortTag)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredTunes.length / TUNES_PER_PAGE);
  const startIndex = (currentPage - 1) * TUNES_PER_PAGE;
  const paginatedTunes = filteredTunes.slice(startIndex, startIndex + TUNES_PER_PAGE);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sortTag]);

  const handleTagClick = (tagName: string) => {
    setSortTag(tagName === sortTag ? "" : tagName);
  };

  return (
    <div
      style={{
        padding: "20px 20px 0px 20px",
        height: "100%",
      }}
    >
      {/* Tag filters */}
      <div
        style={{
          paddingBottom: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <p style={{ fontSize: "12px", fontWeight: "bold" }}>Tags:</p>
        <div style={{ display: "flex", flexDirection: "row", gap: "5px", flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <Button
              active={tag.name === sortTag}
              key={tag.id}
              onClick={() => handleTagClick(tag.name)}
            >
              {tag.name}
            </Button>
          ))}
        </div>
        {sortTag && (
          <span style={{ fontSize: "12px", color: "#666" }}>
            Showing {filteredTunes.length} tune{filteredTunes.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Tune list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "2px",
        }}
      >
        {paginatedTunes.map((tune) => (
          <TuneListWithTags key={tune.sessionId} tune={tune} sortTag={sortTag} userId={userId} />
        ))}
      </div>

      {/* Pagination */}
      <ClientPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

