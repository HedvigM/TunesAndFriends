"use client";

import { useState, useMemo } from "react";
import { StyledTable } from "components/Table";
import { User as PrismaUser } from "@prisma/client";
import styles from "styles/containers.module.scss";
import { addRelationAction } from "app/friends/actions";

interface FriendsClientProps {
  usersList: PrismaUser[];
  currentUserEmail: string;
  friendsArray: string[];
}

export function FriendsClient({
  usersList,
  currentUserEmail,
  friendsArray: initialFriendsArray,
}: FriendsClientProps) {
  const [friendsArray, setFriendsArray] = useState<string[]>(initialFriendsArray);

  const friendIdToAuth0Id = useMemo(() => {
    const map = new Map<number, string>();
    usersList.forEach((user) => {
      if (user.auth0UserId) {
        map.set(user.id, user.auth0UserId);
      }
    });
    return map;
  }, [usersList]);

  const onClickHandle = async (friendId: number) => {
    const auth0UserId = friendIdToAuth0Id.get(friendId);
    if (!auth0UserId) {
      console.error("Could not find auth0UserId for friend id:", friendId);
      return;
    }

    setFriendsArray((prev) => [...prev, auth0UserId]);

    const result = await addRelationAction(friendId);

    if (!result.success) {
      setFriendsArray((prev) => prev.filter((id) => id !== auth0UserId));
      console.error("Failed to add relation:", result.error);
    }
  };

  const filteredUsers = usersList.filter(
    (item) => item.email !== currentUserEmail
  );

  return (
    <div className={styles.dataContainer}>
      {filteredUsers.map((friend) => (
        <StyledTable
          key={friend.id}
          onClickHandle={onClickHandle}
          know={
            friendsArray !== undefined &&
            friendsArray.includes(friend.auth0UserId || "")
          }
          data={friend}
          pathname="/friend"
          slug={friend.id.toString()}
        />
      ))}
    </div>
  );
}

