"use client";

import { useState } from "react";
import { StyledTable } from "components/Table";
import { User as PrismaUser } from "@prisma/client";
import styles from "styles/containers.module.scss";
import { addRelationAction } from "app/friends/actions";

interface FriendsClientProps {
  usersList: PrismaUser[];
  currentUserEmail: string;
  friendsArray: number[];
}

export function FriendsClient({
  usersList,
  currentUserEmail,
  friendsArray: initialFriendsArray,
}: FriendsClientProps) {
  const [friendsArray, setFriendsArray] = useState<number[]>(initialFriendsArray);

  const onClickHandle = async (friendId: number) => {
    // Optimistically add to friends array
    setFriendsArray((prev) => [...prev, friendId]);

    const result = await addRelationAction(friendId);

    if (!result.success) {
      // Revert on failure
      setFriendsArray((prev) => prev.filter((id) => id !== friendId));
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
          know={friendsArray.includes(friend.id)}
          data={friend}
          pathname="/friend"
          slug={friend.id.toString()}
        />
      ))}
    </div>
  );
}

