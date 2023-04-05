import React, { useEffect, useState } from "react";
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from "@auth0/nextjs-auth0";
import { addNewRelation, getUser } from "services/local";
import { NextPage } from "next";
import { LoadingSpinner } from "components/LoadingSpinner";
import { getCachedListOfUsers } from "services/functions";
import { styled } from "@mui/material";
import { Menu } from "components/Menu";
import { Header } from "components/Header";
import { StyledTable } from "components/Table";
import {
  ContentContainer,
  LogoContainer,
  OuterAppContainer,
  StickyMenuContainer,
} from "styles/layout";
import { User as PrismaUser } from "@prisma/client";
import { User } from "@auth0/auth0-spa-js/dist/typings/global";

const Friends: NextPage<{}> = () => {
  const [usersList, setUsersList] = useState<PrismaUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapFriendsId, setMapFriendsId] = useState<string[]>([]);
  const [friendsArray, setFiendsArray] = useState<string[]>([]);
  const { user } = useUser();

  const getUsersList = async (user: User) => {
    const data = await getCachedListOfUsers(user);
    if (data) {
      setUsersList(data);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUsersList(user);
    setLoading(false);
  }, []);

  const onClickHandle = (
    addingEmail: string,
    addedEmail: string,
    addedId: string
  ) => {
    let newMapFriendsId = mapFriendsId.slice();
    newMapFriendsId.push(addedId);
    setMapFriendsId(newMapFriendsId);
    addNewRelation(addingEmail, addedEmail);
  };

  useEffect(() => {
    setLoading(true);
    const fetchUserWithId = async () => {
      if (user) {
        const newUserWithId = await getUser(user?.sub as string);
        if (newUserWithId.success) {
          let newFrindsArray = await newUserWithId.data?.following.map(
            (friend: { auth0UserId: string }) => friend.auth0UserId
          );
          setFiendsArray(newFrindsArray);
        }
        setLoading(false);
      }
    };

    fetchUserWithId();
  }, [user]);

  return (
    <OuterAppContainer>
      <LogoContainer>
        <Header textAlign="left" size="small">
          T&F
        </Header>
      </LogoContainer>
      <ContentContainer>
        <Header textAlign="center" size="large">
          Friends
        </Header>
        <div style={{ padding: "20px 0" }}>
          {usersList &&
            usersList
              .filter((item) => item.email !== user.email)
              .map((friend) => (
                <StyledTable
                  onClickHandle={() =>
                    onClickHandle(user.email, friend.email, friend.auth0UserId)
                  }
                  know={
                    friendsArray.length < 1
                      ? false
                      : friendsArray.includes(friend.auth0UserId)
                  }
                  data={friend}
                  pathname="/friend/[slug]"
                  slug={friend.auth0UserId}
                />
              ))}
        </div>
      </ContentContainer>
      <StickyMenuContainer>
        <Menu />
      </StickyMenuContainer>
    </OuterAppContainer>
  );
};

export default withPageAuthRequired<WithPageAuthRequiredProps>(Friends);
