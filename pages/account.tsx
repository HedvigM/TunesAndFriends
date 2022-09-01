import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import { Avatar, Box, Typography } from '@mui/material';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

export default function Profile() {
  const { user } = useUser();
  const router = useRouter();

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
      </Container>

      <Footer />
    </>
  );
}
