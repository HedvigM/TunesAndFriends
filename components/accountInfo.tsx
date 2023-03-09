import React from "react";
import { Box, styled } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { User } from "@prisma/client";
import { LoadingSpinner } from "components/LoadingSpinner";
import { colors, theme } from "styles/theme";

type AccountInfoProps = {
  handleProfileChange: (profileText: string, town: string) => void;
  newProfileText: (profileText: string) => void;
  newTownText: (town: string) => void;
  databaseUser: User;
};

export const AccountInfo = (props: AccountInfoProps) => {
  const { user } = useUser();

  if (user && props.databaseUser) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <GridContainer>
          <GridItem
            style={{
              borderRight: "none",
              borderTop: "1px solid black",
              padding: "10px",
            }}
          >
            FIRST NAME {user.given_name}
          </GridItem>
          <GridItem style={{ borderTop: "1px solid black", padding: "10px" }}>
            LAST NAME {user.family_name}
          </GridItem>
          <GridItem
            style={{
              gridColumn: " 1 / 3",
              padding: "10px",
            }}
          >
            EMAIL {user.email}
          </GridItem>
          <GridItem style={{ borderRight: "none", padding: "10px" }}>
            GENDER
          </GridItem>
          <GridItem style={{ padding: "10px" }}>BIRTHDAY</GridItem>
          <GridItem
            style={{
              gridColumnStart: "1",
              gridColumnEnd: "3",
            }}
          >
            <TextArea
              placeholder={
                props.databaseUser.town ? props.databaseUser.town : "TOWN"
              }
              rows={1}
              onChange={(event) => props.newTownText(event.target.value)}
            ></TextArea>
          </GridItem>

          <GridItem
            style={{
              gridArea: "5 / 1 / 7 / 3",
              textAlign: "left",
              height: "100%",
            }}
          >
            <TextArea
              onChange={(event) => props.newProfileText(event.target.value)}
              placeholder={
                props.databaseUser.profileText
                  ? props.databaseUser.profileText
                  : "PROFILE TEXT"
              }
              rows={5}
            ></TextArea>
          </GridItem>
        </GridContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "20px",
          }}
        ></Box>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
};

const GridContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  padding-top: 20px;
`;
const GridItem = styled("div")`
  border: 1px solid black;
  border-top: none;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const TextArea = styled("textarea")`
  resize: none;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  padding: 10px;
  border: 2px solid #fff;

  &:focus {
    border: 2px solid;
    border-color: ${colors.first};
  }
`;
