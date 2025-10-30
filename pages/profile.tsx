import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import {
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
import { AccountInfo } from "components/accountInfo";
import { getUser, updateUser } from "services/local";
import { User as PrismaUser } from "@prisma/client";
import LogoutIcon from "@mui/icons-material/Logout";
import { ProfileImage } from "components/ProfileImage";
import Link from "next/link";
import { UpdateUserRequest } from "lib/api/types";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { Button } from "styles/Button";
import { Page } from "styles/Page";

const ProfilePage: NextPage<{}> = ({}) => {
  const [databaseUser, setDatabaseUser] = useState<PrismaUser>();
  const [town, setTown] = useState("");
  const [profileText, setProfileText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useUser();

  const handleProfileChange = (profileText: string, town: string) => {
    if (databaseUser && databaseUser.id) {
      const updateData: UpdateUserRequest = {
        email: databaseUser.email,
        town: town,
        profileText: profileText,
      };
      updateUser(updateData);
      handleClickOpen();
    }
  };
  /* Make the sum obligatorisk i typen */

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.sub) {
        const fetchedUser = await getUser(user.sub);
        if (fetchedUser.success) {
          setDatabaseUser(fetchedUser.data as PrismaUser);
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
    <Page title="Profile">

          <ComponentErrorBoundary componentName="Profile Image">
            <div
              style={{
                paddingTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ProfileImage size={"large"} />
            </div>
          </ComponentErrorBoundary>
          <ComponentErrorBoundary componentName="Account Information">
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
                element="button"
                active={true}
                onClick={() => handleProfileChange(profileText, town)}
              >
                Save
              </Button>
            </div>
          </ComponentErrorBoundary>
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
    </Page>
  );
};

const LogoutContainer = styled("div")`
  display: flex;
  justify-content: space-around;
  border: 1px solid red;
  width: 100px;
`;

export default withPageAuthRequired<WithPageAuthRequiredProps>(ProfilePage);
