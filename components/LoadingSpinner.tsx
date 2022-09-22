import { Box, CircularProgress, Container } from '@mui/material';
import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const LoadingSpinner = () => {
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
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <CircularProgress color='primary' />
      </Container>
      <Footer />
    </Box>
  );
};
