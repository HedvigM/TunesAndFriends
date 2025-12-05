"use client";
import { useMemo } from "react";
import { StyledTable } from "./Table";
import { ComponentErrorBoundary } from "./errors/ComponentErrorBoundary";

type TunesIncommonProps = {
  logedinKnowTuneId: number[];
  knowTunes: {
    id: number;
    name: string;
  }[];
};

export const TunesIncommon = ({
  logedinKnowTuneId,
  knowTunes,
}: TunesIncommonProps) => {
  // Compute common tunes directly from props - no need for useEffect
  const commonTunes = useMemo(() => {
    if (!logedinKnowTuneId || !knowTunes) return [];
    return knowTunes.filter((knowTune) =>
      logedinKnowTuneId.includes(knowTune.id)
    );
  }, [logedinKnowTuneId, knowTunes]);

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
