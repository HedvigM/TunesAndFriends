import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Box, CircularProgress, Container } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';
import { User } from '@auth0/auth0-react';
import { Header } from 'components/Header';
import { TeasersList } from 'components/landingPage/TeasersList';
import { ImageBG } from 'components/landingPage/ImageBG';
import { Footer } from 'components/Footer';

const IndexPage: NextPage<{}> = ({}) => {
  const { user, isLoading } = useUser();
  const [loading, setLoading] = useState(false);

  if (user && !loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh',
        }}
      >
        <Header />
        <Container maxWidth='md'>
          <Head>
            <title>Tunes & Friends</title>
          </Head>
          <TeasersList />
          <ImageBG />
        </Container>
        <Footer />
      </Box>
    );
  } else {
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
            flexGrow: '1',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircularProgress color='primary' />
        </Container>
        <Footer />
      </>
    );
  }
};

export default IndexPage;
