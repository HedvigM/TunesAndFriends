import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import {
  Avatar,
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { getUser, updateUser } from "services/local";
import { User } from "@prisma/client";
import { NextPage } from "next";
import { LoadingSpinner } from "components/LoadingSpinner";

export const Account = () => {
  const { user } = useUser();
  const [town, setTown] = useState("");
  const [profileText, setProfileText] = useState("");
  const [databaseUser, setDatabaseUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = () => {
    if (databaseUser && databaseUser.id) {
      updateUser(databaseUser, town, profileText);
    }
    handleClickOpen();
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    padding: 10px;
  `;
  const TextArea = styled("textarea")`
    resize: none;
    height: 100%;
    width: 100%;
    border: none;
  `;

  if (user && !loading) {
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
            style={{ borderRight: "none", borderTop: "1px solid black" }}
          >
            FIRST NAME {user.given_name}
          </GridItem>
          <GridItem style={{ borderTop: "1px solid black" }}>
            LAST NAME {user.family_name}
          </GridItem>
          <GridItem
            style={{
              gridColumn: " 1 / 3",
            }}
          >
            EMAIL {user.email}
          </GridItem>
          <GridItem style={{ borderRight: "none" }}>GENDER</GridItem>
          <GridItem>BIRTHDAY</GridItem>
          <GridItem
            style={{
              gridColumnStart: "1",
              gridColumnEnd: "3",
            }}
          >
            <TextArea placeholder="TOWN" rows={1}></TextArea>
            {/*  <TextField
              margin="normal"
              id="outlined"
              size="small"
              label="TOWN"
              value={town}
              onChange={(event) => setTown(event.target.value)}
            /> */}
          </GridItem>

          <GridItem
            style={{
              gridArea: "5 / 1 / 7 / 3",
              textAlign: "left",
              height: "100%",
            }}
          >
            <TextArea placeholder="PROFILE TEXT" rows={5}></TextArea>
            {/*   <TextField
               margin="normal"
              id="outlined-multiline-static"
              variant="filled"
              rows={2}
              size="small"
              label="PROFILE TEXT"
              value={profileText}
              onChange={(event) => setProfileText(event.target.value)}
              multiline
              style={{ border: "none" }}
            /> */}
            {/*  <TextField
              id="standard-textarea"
              label="Multiline Placeholder"
              placeholder="Placeholder"
              multiline
              variant="standard"
            /> */}
          </GridItem>
        </GridContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleChange()}
            sx={{
              color: "text.primary",
              backgroundColor: "primary.second",
            }}
          >
            Save
          </Button>
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
        </Box>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
};
