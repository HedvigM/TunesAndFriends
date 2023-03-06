import React from "react";
import { NextPage } from "next";
import { Box, Container } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { LoadingSpinner } from "components/LoadingSpinner";
import { Menu } from "components/Menu";
import { Header2 } from "components/Header2";
import { Account } from "components/account";
import { ProfileContainer } from "./friend/[slug]";

const ProfilePage: NextPage<{}> = ({}) => {
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
        maxWidth='sm'
        sx={{
          width: "75%",
          paddingY: "10px",
          marginY: "30px",
        }}
      >
        <Header2>Profile</Header2>
        {/*  <ProfileContainer> */}
        <Account />
        {/*    </ProfileContainer> */}
      </Container>
      <Menu />
    </Box>
  );
};

export default ProfilePage;
