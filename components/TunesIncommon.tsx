import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledTable } from "./Table";

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
  const [commonTunes, setCommonTunes] =
    useState<TunesIncommonProps["knowTunes"]>();

  useEffect(() => {
    if (logedinKnowTuneId && knowTunes) {
      const commonTunes = knowTunes.filter(
        (knowTune) =>
          logedinKnowTuneId.findIndex(
            (loggedInKnowTuneSingleId) =>
              loggedInKnowTuneSingleId == knowTune.id
          ) > -1
      );
      setCommonTunes(commonTunes);
    }
  }, [logedinKnowTuneId, knowTunes]);

  return (
    <Container>
      {commonTunes &&
        commonTunes.map((tune) => (
          <StyledTable
            onClickHandle={() => {}}
            know={true}
            pathname="/tune/[slug]"
            slug={tune.id}
            data={tune}
          />
        ))}
    </Container>
  );
};
