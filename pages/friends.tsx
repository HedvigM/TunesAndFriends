import React from 'react';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

export const Friends = () => {
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
          The Friends page
        </Typography>
      </Container>

      <Footer />
    </>
  );
};

export default Friends;
