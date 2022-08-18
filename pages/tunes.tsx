import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Header } from 'components/Header';
import { SearchTunes } from 'components/SearchTunes';
import { Footer } from 'components/Footer';

export default function Tunes() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <SearchTunes />
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
