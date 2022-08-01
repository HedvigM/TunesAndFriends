import React from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Brightness3OutlinedIcon from '@mui/icons-material/Brightness3Outlined';
import { Button, ButtonGroup, Switch, Typography } from '@mui/material';
import { Header } from 'styles/components/Header';
import { Footer } from 'styles/components/Footer';

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
