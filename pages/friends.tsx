import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Skeleton, Typography } from "@mui/material";
import Link from "next/link";
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from "@auth0/nextjs-auth0";
import { addNewRelation, getUser, listUsersWithTune } from "services/local";
import { NextPage } from "next";
import { LoadingSpinner } from "components/LoadingSpinner";
import { getCachedListOfUsers } from "services/functions";
import { styled } from "@mui/material";
import { Menu } from "components/Menu";
import { Header } from "components/Header";
import { StyledTable } from "components/Table";
import { StickyMenuContainer } from "pages";

interface FriendsProps {
  user: {
    auth0UserId: string;
    createdAt: Date;
    email: string;
    id: number;
    name: string;
    profileText?: string;
    role: "BASIC" | "ADMIN";
    town: "string";
  };
}

const Friends: NextPage<{}> = () => {
  const [usersList, setUsersList] = useState([]);
  const [usersTuneList, setUsersTuneList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapFriendsId, setMapFriendsId] = useState([]);
  const [friendsArray, setFiendsArray] = useState<string[]>([]);
  const { user } = useUser();

  const getUsersList = async (user) => {
    const data = await getCachedListOfUsers(user);
    if (data) {
      setUsersList(data);
    }
  };
  const getListOfTuneUsers = async (tuneId: number) => {
    const fetchedList = await listUsersWithTune(tuneId);
    console.log({ fetchedList });
    if (fetchedList.success) {
      setUsersTuneList(fetchedList.data);
    }
  };

  console.log({ usersTuneList });

  useEffect(() => {
    setLoading(true);
    getListOfTuneUsers(27);
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
  type NewUserWithIdType = {
    success: Boolean;
    data: {
      auth0UserId: string;
      createdAt: string;
      email: string;
      followedBy: string[];
      following: object[];
      id: number;
      knowTunes: {
        id: number;
        sessionId: number;
      };
      name: string;
      profileText: string;
      role: string;
      starredTunes: {
        id: number;
        sessionId: number;
      };
      town: string;
    };
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <Container
        sx={{
          paddingY: "10px",
          marginY: "30px",
        }}
      >
        <Header size="large">Friends</Header>
        <div style={{ padding: "20px 0" }}>
          {!usersList || (loading && <LoadingSpinner />)}
          {usersList
            .filter((item) => item.email !== user.email)
            .map((friend) => (
              <StyledTable
                onClickHandle={() =>
                  onClickHandle(user.email, friend.email, friend.auth0UserId)
                }
                know={friendsArray.includes(friend.auth0UserId)}
                data={friend}
                pathname="/friend/[slug]"
                slug={friend.auth0UserId}
              />
            ))}
        </div>
      </Container>
      <StickyMenuContainer>
        <Menu />
      </StickyMenuContainer>
    </Box>
  );
};
/* else {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            width: "75%",
            paddingY: "10px",
            marginY: "30px",
          }}
        >
          <Typography textAlign="center" variant="h1">
            The Friends page
          </Typography>

          <Skeleton
            variant="rectangular"
            animation="wave"
            height={30}
            sx={{ width: "100%", margin: " 5px 0" }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={30}
            sx={{ width: "100%", margin: "5px 0" }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={30}
            sx={{ width: "100%", margin: "5px 0" }}
          />
        </Container>
      </Box>
    );
  } */

interface buttonProps {
  readonly included: boolean;
}

const FriendsButton = styled("button", {
  shouldForwardProp: (prop) => prop !== "included",
})<buttonProps>((props) => ({
  backgroundColor: props.included
    ? "inherit"
    : props.theme.palette.primary.main,
  padding: "5px 10px",
  border: "none",
  borderRadius: "3px",
  boxShadow: "1px 1px 0px deeppink",

  "&:hover": {
    backgroundColor: props.included
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark,
    cursor: "pointer",
  },
}));
export default withPageAuthRequired<WithPageAuthRequiredProps>(Friends);
