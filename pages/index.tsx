import React from "react";
import { NextPage } from "next";
import { Box } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { LoadingSpinner } from "components/LoadingSpinner";
import { Menu } from "components/Menu";
import { Header } from "components/Header";
import { Login } from "components/Login";

const IndexPage: NextPage<{}> = ({}) => {
  const { user, isLoading } = useUser();

  if (!user) {
    return (
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <Login />
        <Menu />
      </Box>
    );
  }
  if (user) {
    return (
      <>
        <Header size={"large"}>Tunes & Friends</Header>
        <div style={{ padding: "50px 0" }}>
          <Header size={"small"}>Tunes & Friends</Header>
        </div>
        <Menu />
      </>
    );
  }
};

export default IndexPage;
