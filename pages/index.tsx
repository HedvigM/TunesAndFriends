import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container, Box, Paper, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

const IndexPage: NextPage<{}> = ({}) => {
  const { user } = useUser();
  console.log(user);

  return (
    <Container maxWidth='md'>
      <Head>
        <title>Tunes & Friends</title>
      </Head>
      <Box mt={6}>
        <Paper>
          <Box p={2}>
            <Typography variant={'h1'}>Tunes & Friends</Typography>
            <Typography variant={'subtitle1'}>Your tune reminder</Typography>
            <p>
              This is the new tunes and friends landingpage. It's using the mui
              library: <a href='https://mui.com/'>MUI</a>
            </p>
            {user ? (
              <Box>
                {user.name}
                <Button variant='contained' href='/api/auth/logout'>
                  Log out
                </Button>
              </Box>
            ) : (
              <Box>
                Ej inloggad
                <Button variant='contained' href='/api/auth/login'>
                  Logga in
                </Button>
              </Box>
            )}

            <Link href='/first-post'>
              <a>This page!</a>
            </Link>
            <Link href='/start'>
              <a>Tunes and friends</a>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default IndexPage;
