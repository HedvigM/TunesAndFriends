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
          The Profile page
        </Typography>
        {user && (
          <>
            <Avatar
              alt='users avatar'
              sx={{ width: 50, height: 50 }}
              src={user.picture}
            />
          </>
        )}
      </Container>

      <Footer />
    </>
  );
}
