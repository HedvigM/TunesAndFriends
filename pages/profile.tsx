import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { AccountInfo } from "components/accountInfo";
import { getUser, updateUser } from "services/local";
import { User as PrismaUser } from "@prisma/client";
import { ProfileImage } from "components/ProfileImage";
import Link from "next/link";
import { UpdateUserRequest } from "lib/api/types";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { Button } from "styles/Button";
import { Page } from "styles/Page";
import { Typography } from "styles/Typography";

/* TODO: Add dialog for saving changes. */
const ProfilePage: NextPage<{}> = ({}) => {
  const [databaseUser, setDatabaseUser] = useState<PrismaUser>();
  const [town, setTown] = useState("");
  const [profileText, setProfileText] = useState<string>("");
  const [_open, setOpen] = useState<boolean>(false);
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
    let isMounted = true;

    const fetchUser = async () => {
      if (user && user.sub) {
        try {
          const fetchedUser = await getUser(user.sub);
          if (isMounted && fetchedUser.success) {
            setDatabaseUser(fetchedUser.data as PrismaUser);
            if (fetchedUser.data?.town) {
              setTown(fetchedUser.data.town);
            }
            if (fetchedUser.data?.profileText) {
              setProfileText(fetchedUser.data.profileText);
            }
          }
        } catch (error) {
          if (isMounted) {
            console.error("Error fetching user:", error);
          }
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
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

  /* const handleClose = () => {
    setOpen(false);
  }; */

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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="body">Log out</Typography>
              <Link href="/api/auth/logout">
              </Link>
            </div>
          </div>
         {/*  <Dialog
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
          </Dialog> */}
    </Page>
  );
};

export default withPageAuthRequired(ProfilePage);
