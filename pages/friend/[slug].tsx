import { useUser } from '@auth0/nextjs-auth0';
import { Avatar, Container, Typography } from '@mui/material';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { useRouter } from 'next/router';
import React from 'react';

/* Profile page and friend page is the same, decide vilken to use.  */

const friend = () => {
  const router = useRouter();
  const { slug: slug } = router.query;
  const { user } = useUser();

  console.log('SLUG', slug);
  return (
    <>
      <Header />
      {user && (
        <Container
          sx={{
            borderRadius: 2,
            boxShadow: 20,
            fontWeight: 'fontWeightLight',
            width: '75%',
            paddingY: '10px',
            marginY: '30px',
            flexGrow: '1',
          }}
        >
          <Typography variant='h1' textAlign='center'>
            {user.name}
          </Typography>
          <Avatar
            alt='users avatar'
            sx={{ width: 50, height: 50 }}
            src={user.picture}
          />
          <Typography variant='body1' textAlign='center'>
            Slug: {slug}
          </Typography>
          <Typography variant='body1' textAlign='center'>
            Gemensamma låtar
          </Typography>
          <Typography variant='body1' textAlign='center'>
            Profilbild, namn, stad, profile text
          </Typography>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default friend;
