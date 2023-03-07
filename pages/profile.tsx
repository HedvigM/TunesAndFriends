import React from "react";
import { NextPage } from "next";
import { Box, Container, styled } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { LoadingSpinner } from "components/LoadingSpinner";
import { Menu } from "components/Menu";
import { Header2 } from "components/Header2";
import { Account } from "components/account";

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
        maxWidth="sm"
        sx={{
          width: "75%",
          paddingY: "10px",
          marginY: "30px",
          height: "100%",
        }}
      >
        <Header2>Profile</Header2>
        <ProfileContainer>
          <Account />
        </ProfileContainer>
      </Container>
      <Menu />
    </Box>
  );
};
export const ProfileContainer = styled("div")`
  /*  padding: 20px 0; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default ProfilePage;
