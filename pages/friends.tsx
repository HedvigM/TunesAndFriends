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
import { useQuery } from "react-query";

const Friends: NextPage<{}> = () => {
  const [mapFriendsId, setMapFriendsId] = useState<string[]>([]);
  const [friendsArray, setFiendsArray] = useState<string[]>([]);
  const { user } = useUser();

  const { data, isLoading, isError, error } = useQuery(
    ["usersList"],
    async () => {
      const data = await getCachedListOfUsers(user);
      return data;
    }
  );

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
    const fetchUserWithId = async () => {
      if (user) {
        const newUserWithId = await getUser(user?.sub as string);
        if (newUserWithId.success) {
          let newFrindsArray = await newUserWithId.data?.following.map(
            (friend: { auth0UserId: string }) => friend.auth0UserId
          );
          setFiendsArray(newFrindsArray);
        }
      }
    };

    fetchUserWithId();
  }, [user]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error}</span>;
  }

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
        <DataContainer>
          {data &&
            data
              .filter((item) => item.auth0UserId !== user.sub)
              .map((friend) => (
                <StyledTable
                  onClickHandle={() =>
                    onClickHandle(user.email, friend.email, friend.auth0UserId)
                  }
                  know={
                    friendsArray !== undefined &&
                    friendsArray.includes(friend.auth0UserId)
                  }
                  data={friend}
                  pathname="/friend/[slug]"
                  slug={friend.auth0UserId}
                />
              ))}
        </DataContainer>
      </ContentContainer>
      <StickyMenuContainer>
        <Menu />
      </StickyMenuContainer>
    </OuterAppContainer>
  );
};
export const DataContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

export default withPageAuthRequired<WithPageAuthRequiredProps>(Friends);
