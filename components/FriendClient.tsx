"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileInfo } from "components/ProfileInfo";
import { TableData, StyledTable } from "components/Table";
import { ProfileImage } from "components/ProfileImage";
import { Button } from "styles/Button";
import { TunesIncommon } from "components/TunesIncommon";
import styles from "styles/containers.module.scss";
import { addRelationAction } from "app/friends/actions";
import { addTuneAction } from "app/tunes/actions";
import { Prisma } from "@prisma/client";

type UserWithRelations = Prisma.UserGetPayload<{
  include: { following: true; followedBy: true; knowTunes: true };
}>;

interface FriendClientProps {
  viewedUser: UserWithRelations;
  friendPicture: string;
  tuneCount: number;
  followingCount: number;
  followersCount: number;
  knowTunes: TableData[];
  loggedinKnowTuneId: number[];
  mapFollowing: number[];
}

export function FriendClient({
  viewedUser,
  friendPicture,
  tuneCount,
  followingCount,
  followersCount,
  knowTunes,
  loggedinKnowTuneId: initialLoggedinKnowTuneId,
  mapFollowing: initialMapFollowing,
}: FriendClientProps) {
  const router = useRouter();
  const [showCommonTunes, setShowCommonTunes] = useState(false);
  const [loggedinKnowTuneId, setLoggedinKnowTuneId] = useState<number[]>(
    initialLoggedinKnowTuneId
  );
  const [isFollowing, setIsFollowing] = useState(
    initialMapFollowing.includes(viewedUser.id)
  );

  const onBackClickHandle = () => {
    router.back();
  };

  const onClickHandle = async () => {
    if (isFollowing) {
      // TODO: Implement unfollow action if needed
      return;
    }

    setIsFollowing(true);

    const result = await addRelationAction(viewedUser.id);

    if (!result.success) {
      setIsFollowing(false);
      console.error("Failed to add relation:", result.error);
    }
  };

  const onKnowHandle = async (tuneId: number) => {
    setLoggedinKnowTuneId((prev) => [...prev, tuneId]);

    const result = await addTuneAction(tuneId);

    if (!result.success) {
      setLoggedinKnowTuneId((prev) => prev.filter((id) => id !== tuneId));
      console.error("Failed to add tune:", result.error);
    }
  };

  const onShowCommonTunes = () => {
    setShowCommonTunes(true);
  };

  const onShowFriendsTunes = () => {
    setShowCommonTunes(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row-reverse",
          paddingTop: "20px",
        }}
      >
        <Button element="button" active={true} onClick={onBackClickHandle}>
          {`<-- Back`}
        </Button>
      </div>
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
          <ProfileImage size={"small"} picture={friendPicture} />
          <Button
            element="button"
            onClick={onClickHandle}
            active={isFollowing}
          >
            Add
          </Button>
        </div>
        <ProfileInfo
          profileText={viewedUser.profileText ?? ""}
          tunesCount={tuneCount}
          following={followingCount}
          followers={followersCount}
        />
      </div>

      <div className={styles.dataContainer}>
        <div style={{ display: "flex" }}>
          <Button
            element="button"
            onClick={onShowCommonTunes}
            active={!showCommonTunes}
          >
            Common tunes
          </Button>
          <Button
            element="button"
            onClick={onShowFriendsTunes}
            active={showCommonTunes}
          >
            FriendsTunes
          </Button>
        </div>
        {showCommonTunes ? (
          <TunesIncommon
            logedinKnowTuneId={loggedinKnowTuneId}
            knowTunes={knowTunes}
          />
        ) : (
          knowTunes?.map((tune) => (
            <StyledTable
              key={tune.id}
              onClickHandle={onKnowHandle}
              know={
                loggedinKnowTuneId !== undefined &&
                loggedinKnowTuneId.includes(tune.id)
              }
              pathname="/tune"
              slug={tune.id}
              data={tune}
            />
          ))
        )}
      </div>
    </>
  );
}

