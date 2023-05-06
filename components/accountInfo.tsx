import React from "react";
import { Box, styled } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { User } from "@prisma/client";
import { LoadingSpinner } from "components/LoadingSpinner";
import { colors } from "styles/theme";

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
          <FlexGridItem
            style={{
              borderRight: "none",
              borderTop: "1px solid black",
            }}
          >
            <FormText>FIRST NAME</FormText>
            <div>{user.given_name}</div>
          </FlexGridItem>
          <FlexGridItem style={{ borderTop: "1px solid black" }}>
            <FormText>LAST NAME</FormText>
            <div>{user.family_name}</div>
          </FlexGridItem>
          <FlexGridItem
            style={{
              gridColumn: " 1 / 3",
            }}
          >
            <FormText>EMAIL</FormText>
            <div>{user.email}</div>
          </FlexGridItem>
          <FlexGridItem style={{ borderRight: "none" }}>
            <FormText>GENDER</FormText>
            <div>a gender choise</div>
          </FlexGridItem>
          <FlexGridItem>
            <FormText>BIRTHDAY</FormText>
            <div>10 januari</div>
          </FlexGridItem>
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
  width: 80%;
  max-width: 600px;
  min-width: 280px;
`;

const GridItem = styled("div")`
  border: 1px solid black;
  border-top: none;
  height: 50px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const FlexGridItem = styled(GridItem)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 0 10px;
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

const FormText = styled("div")`
  font-family: monospace;
  font-size: 0.8rem;
  color: #717171;
`;
