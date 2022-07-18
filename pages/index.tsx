import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container, Box, Paper, Button } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';
import { Footer } from 'styles/components/Footer';
import { Header } from 'styles/components/Header';

const IndexPage: NextPage<{}> = ({}) => {
  const { user } = useUser();
  console.log(user);

  return (
    <>
      <Header />
      <Container maxWidth='md'>
        <Head>
          <title>Tunes & Friends</title>
        </Head>
        <Box mt={6}>
          <Paper>
            <Box p={2}>
              <p>
                This is the new tunes and friends landingpage. It's using the
                mui library: <a href='https://mui.com/'>MUI</a>
              </p>
              {user ? (
                <Box>{user.name}</Box>
              ) : (
                <Box>
                  Ej inloggad
                  <Button variant='contained' href='/api/auth/login'>
                    Logga in
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default IndexPage;
