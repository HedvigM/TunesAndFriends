import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { User } from "@prisma/client";
import { LoadingSpinner } from "components/LoadingSpinner";
import { colors } from "styles/theme";

type AccountInfoProps = {
  handleProfileChange: (
    name: string,
    lastName: string,
    gender: string,
    birthday: Date,
    town: string,
    profileText: string,
    profilePicture: string
  ) => void;
  newName: (name: string) => void;
  newLastName: (lastName: string) => void;
  newGender: (gender: string) => void;
  newBirthday: (birthday: Date) => void;
  newTownText: (town: string) => void;
  newProfileText: (profileText: string) => void;
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
            <FocusStyle>
              <FormText>FIRST NAME</FormText>
              <TextArea
                placeholder={
                  props.databaseUser.name ? props.databaseUser.name : ""
                }
                rows={1}
                onChange={(event) => props.newName(event.target.value)}
              ></TextArea>
            </FocusStyle>
          </FlexGridItem>
          <FlexGridItem style={{ borderTop: "1px solid black" }}>
            <FocusStyle>
              <FormText>LAST NAME</FormText>
              <TextArea
                placeholder={
                  props.databaseUser.lastName ? props.databaseUser.lastName : ""
                }
                rows={1}
                onChange={(event) => props.newLastName(event.target.value)}
              ></TextArea>
            </FocusStyle>
          </FlexGridItem>
          <FlexGridItem
            style={{
              gridColumn: " 1 / 3",
            }}
          >
            <FocusStyle>
              <FormText>EMAIL</FormText>
              <FormText style={{ padding: "0", margin: "0" }}>
                {console.log("props.databaseUser.email:", props.databaseUser)}
                {props.databaseUser.email ? props.databaseUser.email : ""}
              </FormText>
            </FocusStyle>
          </FlexGridItem>
          <FlexGridItem style={{ borderRight: "none" }}>
            <FocusStyle>
              <FormText>GENDER</FormText>
              <TextArea
                placeholder={
                  props.databaseUser.gender ? props.databaseUser.gender : ""
                }
                rows={1}
                onChange={(event) => props.newGender(event.target.value)}
              ></TextArea>
            </FocusStyle>
          </FlexGridItem>
          <FlexGridItem>
            <FocusStyle>
              <FormText>BIRTHDAY</FormText>
              <div>date</div>
            </FocusStyle>
          </FlexGridItem>
          <FlexGridItem
            style={{
              gridColumnStart: "1",
              gridColumnEnd: "3",
            }}
          >
            <FocusStyle>
              <FormText>TOWN</FormText>
              <TextArea
                placeholder={
                  props.databaseUser.town ? props.databaseUser.town : ""
                }
                rows={1}
                onChange={(event) => props.newTownText(event.target.value)}
              ></TextArea>
            </FocusStyle>
          </FlexGridItem>

          <FlexGridItem
            style={{
              gridArea: "5 / 1 / 7 / 3",
              textAlign: "left",
              height: "100%",
            }}
          >
            <FocusStyle>
              <FormText>PROFILE TEXT</FormText>
              <TextArea
                rows={4}
                onChange={(event) => props.newProfileText(event.target.value)}
                placeholder={
                  props.databaseUser.profileText
                    ? props.databaseUser.profileText
                    : ""
                }
              ></TextArea>
            </FocusStyle>
          </FlexGridItem>
        </GridContainer>
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
  padding: 20px 0;
  width: 80%;
  max-width: 600px;
  min-width: 280px;
`;

const GridItem = styled("div")`
  border: 1px solid black;
  border-top: none;
  height: 50px;
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
`;
const FlexGridItem = styled(GridItem)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const FocusStyle = styled("div")`
  width: 100%;
  padding: 0 10px;
  border: 2px solid transparent;

  &:focus-within {
    border: 2px solid;
    border-color: ${colors.first};
  }
`;
const TextArea = styled("textarea")`
  resize: none;
  width: 100%;
  border: none;
  outline: none;
  padding: 0;
  font-family: Oxygen;

  ::placeholder {
    color: black;
  }
`;

const FormText = styled("div")`
  font-family: monospace;
  font-size: 0.8rem;
  color: #717171;
`;
