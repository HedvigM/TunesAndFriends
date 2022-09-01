import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { getUser } from 'services/local';

/* 
TODO: 
- Fix the type problems.
- hange info in textbox. (only town and profile text to start with. later you have to be able to change the email.)
- Swal pop up (look at the old project.)
*/
export default function Profile() {
  const router = useRouter();
  const { user } = useUser();
  const [town, setTown] = useState('');
  const [profileText, setProfileText] = useState('');
  const [updatedTown, setUpdatedTown] = useState('');

  const fetchUser = async () => {
    const databaseUser = await getUser(user.email);
    if (databaseUser.success) {
      setTown(databaseUser.data.town);
      setProfileText(databaseUser.data.profileText);
    }
  };

  const onUpdateUserHandel = (updatedTown) => {
    console.log('UPDATE', updatedTown);
    /* uptadeUser(); */
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  });

  return (
    <>
      <Header />
      <Container
        sx={{
          borderRadius: 2,
          boxShadow: 20,
          fontWeight: 'fontWeightLight',
          width: '75%',
          paddingY: '10px',
          marginY: '30px',
        }}
      >
        <Typography textAlign='center' variant='h1'>
          The Account page
        </Typography>
        {user && (
          <>
            <Avatar
              alt='users avatar'
              sx={{ width: 200, height: 200 }}
              src={user.picture}
            />
            <Box sx={{ paddingTop: '30px' }}>
              <Typography textAlign='left' variant='body1'>
                Given Name: {user.given_name}
              </Typography>
              <Typography textAlign='left' variant='body1'>
                Family Name: {user.family_name}
              </Typography>
              <Typography textAlign='left' variant='body1'>
                Nickname: {user.nickname}
              </Typography>
              <Typography textAlign='left' variant='body1'>
                Email: {user.email}
              </Typography>
              <Typography textAlign='left' variant='body1'>
                Languae: {user.locale}
              </Typography>
            </Box>
          </>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            padding: '30px 0px',
          }}
        >
          {town && (
            <Box sx={{ padding: '30px 0' }}>
              <Typography variant='body1'>{town}</Typography>
              <TextField
                id='outlined-search'
                label='Change Town'
                type='search'
                value={}
              />
            </Box>
          )}
          {profileText && (
            <Box>
              <Typography variant='body1'>{profileText}</Typography>
              <TextField
                id='outlined-textarea'
                label='New Presentation'
                multiline
              />
            </Box>
          )}
          <Button size='medium' onClick={() => {}}>
            Save
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
}
