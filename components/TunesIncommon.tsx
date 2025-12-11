"use client";
import { useMemo } from "react";
import { StyledTable } from "./Table";
import { ComponentErrorBoundary } from "./errors/ComponentErrorBoundary";

type TunesIncommonProps = {
  friendTuneIds: number[];
  userTunes: {
    id: number;
    name: string;
  }[];
};

export const TunesIncommon = ({
  friendTuneIds,
  userTunes,
}: TunesIncommonProps) => {
  const commonTunes = useMemo(() => {
    if (!friendTuneIds || !userTunes) return [];
    return userTunes.filter((tune) =>
      friendTuneIds.includes(tune.id)
    );
  }, [friendTuneIds, userTunes]);

  return (
    <ComponentErrorBoundary componentName="Tunes in Common">
      {commonTunes.map((tune) => (
        <StyledTable
          key={tune.id}
          onClickHandle={() => {}}
          know={true}
          pathname="/tune"
          slug={tune.id}
          data={tune}
        />
      ))}
    </ComponentErrorBoundary>
  );
};
