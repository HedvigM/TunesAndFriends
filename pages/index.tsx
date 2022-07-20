import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container, Box, Paper, Button } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';
import { Footer } from 'styles/components/Footer';
import { Header } from 'styles/components/Header';
import { TeasersList } from 'styles/components/landingPage/TeasersList';
import { ImageBG } from 'styles/components/landingPage/ImageBG';

const IndexPage: NextPage<{}> = ({}) => {
  const { user } = useUser();
  console.log(user);

  return (
    <>
      <Header />
      <TeasersList />
      <ImageBG />
      <Container maxWidth='md'>
        <Head>
          <title>Tunes & Friends</title>
        </Head>
      </Container>
      <Footer />
    </>
  );
};

export default IndexPage;
