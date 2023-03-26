import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Link,
  styled,
} from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { LoadingSpinner } from "components/LoadingSpinner";
import { Menu } from "components/Menu";
import { Header } from "components/Header";
import { AccountInfo } from "components/accountInfo";
import { getUser, updateUser } from "services/local";
import { User } from "@prisma/client";
import user from "./api/user/[slug]";
import { colors } from "styles/theme";
import LogoutIcon from "@mui/icons-material/Logout";
import { ProfileImage } from "components/ProfileImage";
import { StickyMenuContainer } from "pages";
import {
  LogoContainer,
  OuterAppContainer,
  ContentContainer,
} from "styles/layout";

const ProfilePage: NextPage<{}> = ({}) => {
  const [databaseUser, setDatabaseUser] = useState<User>();
  const [town, setTown] = useState("");
  const [profileText, setProfileText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const handleProfileChange = (profileText: string, town: string) => {
    if (databaseUser && databaseUser.id) {
      updateUser(databaseUser, town, profileText);
      handleClickOpen();
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

  const setNewProfileText = (value: string) => {
    setProfileText(value);
  };
  const setNewTownText = (value: string) => {
    setTown(value);
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
        <Header size="large" textAlign="center">
          Profile
        </Header>
        <div
          style={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ProfileImage size={"large"} />
        </div>
        <AccountInfo
          handleProfileChange={handleProfileChange}
          newProfileText={setNewProfileText}
          newTownText={setNewTownText}
          databaseUser={databaseUser}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => handleProfileChange(profileText, town)}
            sx={{
              color: "text.primary",
              backgroundColor: colors.second,
            }}
          >
            Save
          </Button>
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
        <Link href="/api/auth/logout">
          <LogoutIcon />
        </Link>
      </ContentContainer>
      <StickyMenuContainer>
        <Menu />
      </StickyMenuContainer>
    </OuterAppContainer>
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
