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
  const [town, setTown] = useState("");
  const [profileText, setProfileText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useUser();

  const handleProfileChange = (profileText: string, town: string) => {
    if (databaseUser && databaseUser.id) {
      updateUser(databaseUser, town, profileText);
      handleClickOpen();
    }
  };
  /* Make the sum obligatorisk i typen */

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.sub) {
        const fetchedUser = await getUser(user.sub);
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
        <Header textAlign="left" size="small" color="blue">
          T&F
        </Header>
      </LogoContainer>
      <ContentContainer>
        <Header size="large" textAlign="center" color="blue">
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
        {databaseUser && (
          <AccountInfo
            handleProfileChange={handleProfileChange}
            newProfileText={setNewProfileText}
            newTownText={setNewTownText}
            databaseUser={databaseUser}
          />
        )}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "30px 0",
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
