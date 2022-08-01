import React from 'react';
import { Header } from 'styles/components/Header';
import { Footer } from 'styles/components/Footer';
import { Box, Container, Typography } from '@mui/material';

export default function Tunes() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
        }}
      >
        <Typography textAlign='center' variant='h1'>
          The Tunes page
        </Typography>
      </Container>
      <Footer />
    </Box>
  );
}
