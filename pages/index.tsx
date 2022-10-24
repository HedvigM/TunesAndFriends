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
import { LoadingSpinner } from 'components/LoadingSpinner';

const IndexPage: NextPage<{}> = ({}) => {
  const { user, isLoading } = useUser();

  if (!isLoading) {
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
        </Container>
        <Footer />
      </Box>
    );
  } else {
    return <LoadingSpinner />;
  }
};

export default IndexPage;
