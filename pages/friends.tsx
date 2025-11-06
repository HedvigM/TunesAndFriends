import { useEffect, useState } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { addNewRelation, getUser } from "services/local";
import { NextPage } from "next";
/* import { getCachedListOfUsers } from "services/functions"; */
import { StyledTable } from "components/Table";
import { User as PrismaUser } from "@prisma/client";
import { Page } from "styles/Page";
import styles from "styles/containers.module.scss";
/* import { UserProfile as User } from "@auth0/nextjs-auth0"; */

const Friends: NextPage<{}> = () => {
  const [usersList, _setUsersList] = useState<PrismaUser[]>([]);
  const [_loading, setLoading] = useState(true);
  const [_mapFriendsId, setMapFriendsId] = useState<string[]>([]);
  const [friendsArray, setFiendsArray] = useState<string[]>([]);
  const { user } = useUser();

 /*  const getUsersList = async (user: User) => {
    const data = await getCachedListOfUsers(user);
      if (data) {
        setUsersList(data);
      }
  }; */

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    if (user) {
     /*  getUsersList(user); */
    }
    if (isMounted) {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  const onClickHandle = (
    addingEmail: string,
    addedEmail: string,
    addedId: string
  ) => {
    setMapFriendsId(prev => [...prev, addedId]);
    addNewRelation(addingEmail, addedEmail);
  };

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    const fetchUserWithId = async () => {
      if (user) {
        try {
          const newUserWithId = await getUser(user?.sub as string);
          if (isMounted && newUserWithId.success) {
            let newFrindsArray = await newUserWithId.data?.following?.map(
              (friend: { auth0UserId: string }) => friend.auth0UserId
            );
            setFiendsArray(newFrindsArray || [] as string[]);
          }
        } catch (error) {
          if (isMounted) {
            console.error("Error fetching user:", error);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    };

    fetchUserWithId();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <Page title="Friends">
        <div className={styles.dataContainer}>
          {usersList &&
            usersList
              .filter((item) => user && item.email !== user.email)
              .map((friend) => (
                <StyledTable
                  key={friend.id}
                  onClickHandle={() => {
                    if (user && typeof user.email === "string") {
                      onClickHandle(user.email, friend.email, friend.auth0UserId);
                    }
                  }}
                  know={
                    friendsArray !== undefined &&
                    friendsArray.includes(friend.auth0UserId)
                  }
                  data={friend}
                  pathname="/friend/[slug]"
                  slug={friend.auth0UserId}
                />
              ))}
        </div>
    </Page>
  );
};

export default withPageAuthRequired(Friends);
