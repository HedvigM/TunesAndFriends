"use client";

/* TODO: Det är nått konstigt med Att lägga till låtar.
De visas inte riktigt ordentligt på my-tunes sen och de
får taggar som inte tillhör den låten. */

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { StyledTable, TableData } from "components/Table";
import { addTuneAction } from "app/tunes/actions";
import styles from "styles/containers.module.scss";

type PopularTune = {
  id: number;
  name: string;
  url: string;
  member: {
    id: number;
    name: string;
    url: string;
  };
  date: string;
  type: string;
  tunebooks: number;
};

interface PopularTunesClientProps {
  popularTunes: PopularTune[];
  knownTuneIds: number[];
}

export function PopularTunesClient({
  popularTunes,
  knownTuneIds,
}: PopularTunesClientProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [knownTunes, setKnownTunes] = useState<number[]>(knownTuneIds);
  const [, setPendingTuneId] = useState<number | null>(null);

  const handleAddTune = (tuneId: number) => {
    // Optimistically update UI
    setKnownTunes((prev) => [...prev, tuneId]);
    setPendingTuneId(tuneId);

    startTransition(async () => {
      const result = await addTuneAction(tuneId);

      if (!result.success) {
        // Revert optimistic update on error
        setKnownTunes((prev) => prev.filter((id) => id !== tuneId));
        console.error("Failed to add tune:", result.error);
        // TODO: Show error message to user
      } else {
        // Refresh to get updated data
        router.refresh();
      }

      setPendingTuneId(null);
    });
  };

  return (
    <div className={styles.tableContainer}>
      {popularTunes.map((tune) => {
        const tableData: TableData = {
          name: tune.name,
          id: tune.id,
        };

        const isKnown = knownTunes.includes(tune.id);
        return (
          <StyledTable
            key={tune.id}
            data={tableData}
            onClickHandle={handleAddTune}
            know={isKnown}
            pathname="/tune"
            slug={tune.id}
            />
        );
      })}
    </div>
  );
}

