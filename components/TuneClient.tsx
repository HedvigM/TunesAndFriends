"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TuneInfo } from "components/TuneInfo";
import { TunePlayer } from "components/TunePlayer";
import { Button } from "styles/Button";
import { addTuneAction } from "app/tunes/actions";
import { User } from "lib/api";

interface TuneClientProps {
  tuneName: string;
  tuneType: string;
  tuneId: string;
  sessionId: number;
  abcNotes: string;
  usersTuneList: User[];
  isKnown: boolean;
}

export function TuneClient({
  tuneType,
  sessionId,
  abcNotes,
  usersTuneList,
  isKnown: initialIsKnown,
}: TuneClientProps) {
  const router = useRouter();
  const [isKnown, setIsKnown] = useState(initialIsKnown);

  const onBackClickHandle = () => {
    router.back();
  };

  const onKnowHandle = async () => {
    setIsKnown(true);

    const result = await addTuneAction(sessionId);

    if (!result.success) {
      setIsKnown(false);
      console.error("Failed to add tune:", result.error);
    }
  };

  // Transform users list to the format expected by TuneInfo
  const knownBy = usersTuneList.map((user) => ({
    name: user.name,
    auth0UserId: user.auth0UserId || "",
  }));

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row-reverse",
        }}
      >
        <Button
          color="var(--color-third)"
          active={false}
          element="button"
          onClick={onBackClickHandle}
        >
          {`<-- Back`}
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "85%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TunePlayer abcNotes={abcNotes} />
        </div>
        <div
          style={{
            width: "85%",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "start",
          }}
        >
          <Button active={isKnown} onClick={onKnowHandle}>
            Add
          </Button>
          <TuneInfo type={tuneType} knownBy={knownBy} />
        </div>
      </div>
    </>
  );
}

