import React from "react";
import { NextPage } from "next";
import { Box } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { LoadingSpinner } from "components/LoadingSpinner";
import { Menu } from "components/Menu";
import { Header } from "components/Header";
import { Login } from "components/Login";
import { StyledTable } from "components/Table";

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

  const Data = [
    {
      name: "jorid",
      id: 0,
    },
    {
      name: "Jobjörn",
      id: 1,
    },
    {
      name: "Hedvig",
      id: 2,
    },
  ];

  if (user) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Header size={"large"}>Tunes & Friends</Header>
        <div style={{ padding: "50px 0" }}>
          <Header size={"small"}>Tunes & Friends</Header>
          {Data.map((data) => (
            <StyledTable
              onClickHandle={() => {}}
              know={false}
              pathname={""}
              data={data}
            />
          ))}
          <Header size={"small"}>Tunes & Friends</Header>
          {Data.map((data) => (
            <StyledTable
              onClickHandle={() => {}}
              know={false}
              pathname={""}
              data={data}
            />
          ))}
          <Header size={"small"}>Tunes & Friends</Header>
          {Data.map((data) => (
            <StyledTable
              onClickHandle={() => {}}
              know={false}
              pathname={""}
              data={data}
            />
          ))}
        </div>
        <Menu />
      </Box>
    );
  }
};

export default IndexPage;
