import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Box, Button, Container, styled } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { LoadingSpinner } from "components/LoadingSpinner";
import { Menu } from "components/Menu";
import { Header2 } from "components/Header2";
import { AccountInfo } from "components/accountInfo";
import { getUser, updateUser } from "services/local";
import { User } from "@prisma/client";
import user from "./api/user/[slug]";

const ProfilePage: NextPage<{}> = ({}) => {
  const [databaseUser, setDatabaseUser] = useState<User>();
  const [town, setTown] = useState("");
  const [profileText, setProfileText] = useState("");
  const { user } = useUser();

  const handleProfileTextChange = (value: string) => {
    console.log({ value });
    setProfileText(value);
    /*  if (databaseUser && databaseUser.id) {
      updateUser(databaseUser, town, profileText);
    } */
  };
  const handleProfileChange = (profileText: string, town: string) => {
    console.log(profileText, town);
    if (databaseUser && databaseUser.id) {
      updateUser(databaseUser, town, profileText);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const fetchedUser = await getUser(user.sub as string);
        if (fetchedUser.success) {
          setDatabaseUser(fetchedUser.data);
          if (fetchedUser.data?.town) {
            setTown(fetchedUser.data.town);
          }
          if (fetchedUser.data?.profileText) {
            setProfileText(fetchedUser.data.profileText);
          }
        }
      }
    };

    fetchUser();
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
        maxWidth="sm"
        sx={{
          width: "75%",
          paddingY: "10px",
          marginY: "30px",
          height: "100%",
        }}
      >
        <Header2>Profile</Header2>
        {/* Jag flyttar ur saker från account komponenten och jobbar just nu med Button. */}
        <div>
          <AccountInfo handleProfileChange={handleProfileChange} />
          <Button
            variant="contained"
            onClick={() => handleProfileChange(profileText, town)}
            sx={{
              color: "text.primary",
              backgroundColor: "primary.first",
            }}
          >
            Save
          </Button>
        </div>
      </Container>
      <Menu />
    </Box>
  );
};

export const ProfileContainer = styled("div")`
  /*  padding: 20px 0; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default ProfilePage;
