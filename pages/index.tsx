import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';
import { User } from '@auth0/auth0-react';
import { Header } from 'components/Header';
import { TeasersList } from 'components/landingPage/TeasersList';
import { ImageBG } from 'components/landingPage/ImageBG';
import { Footer } from 'components/Footer';
import { addUser } from 'services/local';

const IndexPage: NextPage<{}> = ({}) => {
  const { user, isLoading } = useUser();

  return (
    <>
      <Header />
      <TeasersList />
      {!User && (
        <>
          <ImageBG />
        </>
      )}
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
