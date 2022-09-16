import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { getUser } from 'services/local';
import { User } from '@prisma/client';
/* Profile page and friend page is the same...  */

export default function Profile() {
  const { user } = useUser();
  const router = useRouter();
  const [databaseUser, setDatabaseUser] = useState<User>();

  /*   useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }); */
  console.log('user', user);
  console.log('databaseuser', databaseUser);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const fetchedUser = await getUser(user.email);
        if (fetchedUser.success) {
          setDatabaseUser(fetchedUser.data);
        }
      }
    };

    fetchUser();
  }, [user]);

  return (
    <>
      <Header />
      {databaseUser && (
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
          <Box
            sx={{ display: 'flex', justifyContent: 'center', padding: '30px' }}
          >
            <Avatar
              alt='users avatar'
              sx={{ width: 100, height: 100 }}
              src={user.picture}
            />
          </Box>
          <Typography
            textAlign='center'
            variant='h1'
            sx={{ borderBottom: '2px solid black' }}
          >
            {databaseUser.name}, {databaseUser.town}
          </Typography>
          <Typography textAlign='center' variant='body1'>
            {databaseUser.profileText}
          </Typography>
          <Button variant='contained'>Friends / become friends</Button>
        </Container>
      )}
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
        <Typography variant='h2'>Tunes incommon:</Typography>
      </Container>

      <Footer />
    </>
  );
}
