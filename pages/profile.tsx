import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  styled,
  Typography,
} from "@mui/material";
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from "@auth0/nextjs-auth0";
import { Menu } from "components/Menu";
import { Header } from "components/Header";
import { AccountInfo } from "components/accountInfo";
import { getUser, updateUser } from "services/local";
import { User as PrismaUser } from "@prisma/client";
import { colors } from "styles/theme";
import LogoutIcon from "@mui/icons-material/Logout";
import { ProfileImage } from "components/ProfileImage";
import {
  LogoContainer,
  OuterAppContainer,
  ContentContainer,
  StickyMenuContainer,
} from "styles/layout";
import Link from "next/link";

const ProfilePage: NextPage<{}> = ({}) => {
  const [databaseUser, setDatabaseUser] = useState<PrismaUser>();
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>();
  const [town, setTown] = useState<string>("");
  const [profileText, setProfileText] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);
  const { user } = useUser();

  const handleProfileChange = (
    name: string,
    lastName: string,
    gender: string,
    birthday: Date,
    town: string,
    profileText: string,
    profilePicture: string
  ) => {
    if (databaseUser && databaseUser.id) {
      updateUser(
        databaseUser,
        name,
        lastName,
        gender,
        birthday,
        town,
        profileText,
        profilePicture
      );
      handleClickOpen();
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (user.sub) {
        const fetchedUser = await getUser(user.sub);
        if (fetchedUser.success) {
          setDatabaseUser(fetchedUser.data);
          if (fetchedUser.data?.name) {
            setName(fetchedUser.data.name);
          }
          if (fetchedUser.data?.lastName) {
            setLastName(fetchedUser.data.lastName);
          }
          if (fetchedUser.data?.email) {
            setEmail(fetchedUser.data.email);
          }
          if (fetchedUser.data?.gender) {
            setGender(fetchedUser.data.gender);
          }
          if (fetchedUser.data?.birthday) {
            setBirthday(fetchedUser.data.birthday);
          }
          if (fetchedUser.data?.town) {
            setTown(fetchedUser.data.town);
          }
          if (fetchedUser.data?.profileText) {
            setProfileText(fetchedUser.data.profileText);
          }
          if (fetchedUser.data?.profilePicture) {
            setProfilePicture(fetchedUser.data.profilePicture);
          }
        }
      }
    };

    fetchUser();
  }, [user]);

  const setNewName = (value: string) => {
    setName(value);
  };
  const setNewLastName = (value: string) => {
    setLastName(value);
  };
  const setNewGender = (value: string) => {
    setGender(value);
  };
  const setNewBirthday = (value: Date) => {
    setBirthday(value);
  };
  const setNewTownText = (value: string) => {
    setTown(value);
  };
  const setNewProfileText = (value: string) => {
    setProfileText(value);
  };
  const setNewProfilePicture = (value: string) => {
    setProfilePicture(value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <OuterAppContainer>
      <LogoContainer>
        <Header textAlign="left" size="small">
          T&F
        </Header>
      </LogoContainer>
      <ContentContainer>
        <Header color="blue" size="large" textAlign="center">
          Profile
        </Header>
        <div
          style={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {databaseUser && (
            <ProfileImage
              profilePicture={databaseUser.profilePicture}
              newPicture={setNewProfilePicture}
              size={"large"}
            />
          )}
        </div>
        {databaseUser && (
          <AccountInfo
            handleProfileChange={handleProfileChange}
            newName={setNewName}
            newLastName={setNewLastName}
            newGender={setNewGender}
            newBirthday={setNewBirthday}
            newTownText={setNewTownText}
            newProfileText={setNewProfileText}
            databaseUser={databaseUser}
          />
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() =>
              handleProfileChange(
                name,
                lastName,
                gender,
                birthday,
                town,
                profileText,
                profilePicture
              )
            }
            sx={{
              color: "text.primary",
              backgroundColor: colors.first,
            }}
          >
            Save
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0",
          }}
        >
          <LogoutContainer>
            <Typography>Log out</Typography>
            <Link href="/api/auth/logout">
              <LogoutIcon />
            </Link>
          </LogoutContainer>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your changes is saved!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK!
            </Button>
          </DialogActions>
        </Dialog>
      </ContentContainer>
      <StickyMenuContainer>
        <Menu />
      </StickyMenuContainer>
    </OuterAppContainer>
  );
};

const LogoutContainer = styled("div")`
  display: flex;
  justify-content: space-around;
  border: 1px solid red;
  width: 100px;
`;
const ProfileContainer = styled("div")`
  /*  padding: 20px 0; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default withPageAuthRequired<WithPageAuthRequiredProps>(ProfilePage);
