import { Box, CircularProgress, Container } from '@mui/material';
import React from 'react';

export const LoadingSpinner = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <CircularProgress color='primary' />
    </Container>
  );
};
