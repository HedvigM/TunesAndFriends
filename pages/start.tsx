import React from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Brightness3OutlinedIcon from '@mui/icons-material/Brightness3Outlined';
import { Button, ButtonGroup, Switch } from '@mui/material';

export const StartPage = () => {
  return (
    <>
      <Container
        sx={{
          bgcolor: 'warning.main',
          borderRadius: 2,
          boxShadow: 20,
          fontWeight: 'fontWeightLight',
          width: '75%',
        }}
      >
        <h1>Tunes & Friends start page</h1>
        <Switch color='secondary' />
        <h2>
          <Link href='/'>
            <a>Back to home</a>
          </Link>
        </h2>
      </Container>
      <Brightness3OutlinedIcon />

      <ButtonGroup variant='text' aria-label='text button group'>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </>
  );
};

export default StartPage;
