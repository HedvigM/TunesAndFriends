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
// Type for user with relations from userWithRelationsSelect
type UserWithRelations = {
  id: number;
  name: string;
  email: string;
  auth0UserId: string;
  town: string | null;
  picture: string | null;
  profileText: string | null;
  userTunes: {
    id: number;
    tune: {
      id: number;
      sessionId: number;
    };
    tag: { id: number; name: string } | null;
  }[];
  following: { id: number; name: string }[];
  followedBy: { id: number; name: string }[];
};

interface FriendClientProps {
  friendData: UserWithRelations;
  tuneCount: number;
  followingCount: number;
  followersCount: number;
  userTunes: TableData[];
  friendsTuneIds: number[];
  mapFollowing: number[];
  userId: number;
}

export function FriendClient({
  friendData,
  tuneCount,
  followingCount,
  followersCount,
  userTunes,
  friendsTuneIds,
  mapFollowing,
  userId,
}: FriendClientProps) {
  const router = useRouter();
  const [showCommonTunes, setShowCommonTunes] = useState(false);
  const [friendTuneIds, setFriendTuneIds] = useState<number[]>(
    friendsTuneIds
  );
  const [isFollowing, setIsFollowing] = useState(
    mapFollowing.includes(userId)
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

    const result = await addRelationAction(friendData.id);

    if (!result.success) {
      setIsFollowing(false);
      console.error("Failed to add relation:", result.error);
    }
  };

  const onKnowHandle = async (tuneId: number) => {
    setFriendTuneIds((prev) => [...prev, tuneId]);

    const result = await addTuneAction(tuneId, friendData.id);

    if (!result.success) {
      setFriendTuneIds((prev) => prev.filter((id) => id !== tuneId));
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
          <ProfileImage size={"small"} picture={friendData.picture ?? ""} />
          <Button
            element="button"
            onClick={onClickHandle}
            active={isFollowing}
          >
            Add
          </Button>
        </div>
        <ProfileInfo
          profileText={friendData.profileText ?? ""}
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
            friendTuneIds={friendTuneIds}
            userTunes={userTunes}
          />
        ) : (
          userTunes?.map((tune) => (
            <StyledTable
              key={tune.id}
              onClickHandle={onKnowHandle}
              know={
                friendTuneIds !== undefined &&
                friendTuneIds.includes(tune.id)
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

