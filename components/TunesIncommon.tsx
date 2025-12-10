"use client";
import { useMemo } from "react";
import { StyledTable } from "./Table";
import { ComponentErrorBoundary } from "./errors/ComponentErrorBoundary";

type TunesIncommonProps = {
  logedinKnowTuneId: number[];
  userTunes: {
    id: number;
    name: string;
  }[];
};

export const TunesIncommon = ({
  logedinKnowTuneId,
  userTunes,
}: TunesIncommonProps) => {
  // Compute common tunes directly from props - no need for useEffect
  const commonTunes = useMemo(() => {
    if (!logedinKnowTuneId || !userTunes) return [];
    return userTunes.filter((tune) =>
      logedinKnowTuneId.includes(tune.id)
    );
  }, [logedinKnowTuneId, userTunes]);

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
