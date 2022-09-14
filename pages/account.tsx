import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import {
  Avatar,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { getUser, updateUser } from 'services/local';
import { User } from '@prisma/client';

/* 
TODO: 
- Fix the type problems.
- change info in textbox. (only town and profile text to start with. later you have to be able to change the email.)
- Swal pop up (look at the old project.)
*/
export default function Profile() {
  const router = useRouter();
  const { user } = useUser();
  const [town, setTown] = useState('');
  const [profileText, setProfileText] = useState('');
  const [databaseUser, setDatabaseUser] = useState<User>();

  const handleChange = () => {
    console.log('ordinary', town, profileText);

    if (databaseUser && databaseUser.id) {
      updateUser(databaseUser, town, profileText);
    }
    /* skicka in updated town till en funktion som uppdaterar databasen.  */
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const fetchedUser = await getUser(user.email);
        if (fetchedUser.success) {
          setDatabaseUser(fetchedUser.data);
          setTown(fetchedUser.data.town);
          setProfileText(fetchedUser.data.profileText);
        }
      }
    };

    fetchUser();
  }, [user]);

  /*
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  });
  */

  return (
    <>
      <Header />
      <Container
        maxWidth='sm'
        sx={{
          borderRadius: 2,
          boxShadow: 20,
          fontWeight: 'fontWeightLight',
          minWidth: '350px',
          width: '75%',
          paddingY: '10px',
          marginY: '30px',
          flexGrow: '1',
        }}
      >
        <Typography textAlign='center' variant='h1'>
          The Account page
        </Typography>
        {user && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '30px',
              }}
            >
              <Avatar
                alt='users avatar'
                sx={{ width: 200, height: 200 }}
                src={user.picture}
              />
            </Box>
            <Box
              sx={{
                paddingTop: '30px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Table
                sx={{
                  maxWidth: '500px',
                  borderTop: '2px solid black',
                }}
              >
                <TableBody>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      Given name:
                    </TableCell>
                    <TableCell>
                      <Typography textAlign='left' variant='body1'>
                        {user.given_name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      Family Name:
                    </TableCell>
                    <TableCell>
                      <Typography textAlign='left' variant='body1'>
                        {user.family_name}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      Nickname:
                    </TableCell>
                    <TableCell>
                      <Typography textAlign='left' variant='body1'>
                        {user.nickname}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      Email:
                    </TableCell>
                    <TableCell>
                      <Typography textAlign='left' variant='body1'>
                        {user.email}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      Languae:
                    </TableCell>
                    <TableCell>
                      <Typography textAlign='left' variant='body1'>
                        {user.locale}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            padding: '30px',
          }}
        >
          <TextField
            margin='normal'
            id='outlined'
            label='Town'
            defaultValue={town}
            onChange={(event) => setTown(event.target.value)}
          />

          <TextField
            margin='normal'
            id='outlined'
            label='Presentation'
            defaultValue={profileText}
            onChange={(event) => setProfileText(event.target.value)}
            multiline
          />

          <Button size='medium' onClick={() => handleChange()}>
            Save
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
}
