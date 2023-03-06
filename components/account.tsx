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
    border-top: 1px solid black;
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

  if (user && !loading) {
    return (
      <>
        <GridContainer>
          <GridItem style={{ borderRight: "none" }}>
            FIRST NAME {user.given_name}
          </GridItem>
          <GridItem>LAST NAME {user.family_name}</GridItem>
          <GridItem
            style={{
              gridColumn: " 1 / 3",
            }}
          >
            Email
          </GridItem>
          <GridItem style={{ borderRight: "none" }}>GENDER</GridItem>
          <GridItem>BIRTHDAY</GridItem>
          <GridItem
            style={{
              gridColumnStart: "1",
              gridColumnEnd: "3",
            }}
          >
            TOWN
          </GridItem>
          <GridItem
            style={{
              gridArea: "5 / 1 / 7 / 3",
              textAlign: "left",
            }}
          >
            PROFILE TEXT
          </GridItem>
        </GridContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
          }}
        >
          <Container
            maxWidth='sm'
            sx={{
              borderRadius: 2,
              boxShadow: 20,
              minWidth: "350px",
              width: "75%",
              paddingY: "10px",
              marginY: "30px",
            }}
          >
            <>
              <Box
                sx={{
                  padding: "30px 10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Table
                  sx={{
                    maxWidth: "500px",
                    borderTop: "2px solid black",
                  }}
                >
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        sx={{ padding: "5px", margin: "0" }}
                      >
                        Nickname:
                      </TableCell>
                      <TableCell sx={{ padding: "5px", margin: "0" }}>
                        <Typography textAlign='left' variant='body1'>
                          {user.nickname}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        sx={{ padding: "5px", margin: "0" }}
                      >
                        Email:
                      </TableCell>
                      <TableCell sx={{ padding: "5px", margin: "0" }}>
                        <Typography textAlign='left' variant='body1'>
                          {user.email}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    ></TableRow>
                  </TableBody>
                </Table>
              </Box>
            </>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                padding: "10px",
              }}
            >
              <TextField
                margin='normal'
                id='outlined'
                size='small'
                label='Town'
                value={town}
                onChange={(event) => setTown(event.target.value)}
              />

              <TextField
                margin='normal'
                id='outlined'
                size='small'
                label='Presentation'
                value={profileText}
                onChange={(event) => setProfileText(event.target.value)}
                multiline
              />
              <Button
                variant='contained'
                onClick={() => handleChange()}
                sx={{ color: "text.primary", marginTop: "10px" }}
              >
                Save
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
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
          </Container>
        </Box>
      </>
    );
  } else {
    return <LoadingSpinner />;
  }
};
