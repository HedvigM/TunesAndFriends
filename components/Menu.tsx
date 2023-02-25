import { Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { addUser } from 'services/local';
import router, { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PeopleIcon from '@mui/icons-material/People';

export const Menu = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (typeof user !== 'undefined' && isLoading === false) {
      addUser(user);
    }
  }, [user, isLoading]);

  return user ? (
    <Box>
      <OuterContainer>
        <LinkContainer href='/friends'>
          <Link href='/friends'>
            <Typography
              variant='body1'
              noWrap
              sx={{
                textDecoration: 'none',
                color: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <PeopleIcon />
            </Typography>
          </Link>
        </LinkContainer>
        <LinkContainer href='/tunes'>
          <Link href='/tunes'>
            <Typography
              variant='body1'
              noWrap
              sx={{
                textDecoration: 'none',
                color: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <MusicNoteIcon />
            </Typography>
          </Link>
        </LinkContainer>
        <LinkContainer href='/test'>
          <Link href='/test'>
            <Typography
              variant='body1'
              noWrap
              sx={{
                textDecoration: 'none',
                color: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <HomeIcon />
            </Typography>
          </Link>
        </LinkContainer>
        <LinkContainer href='/inställningar'>
          <Link href='/inställningar'>
            <Typography
              variant='body1'
              noWrap
              sx={{
                textDecoration: 'none',
                color: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <SettingsSuggestIcon />
            </Typography>
          </Link>
        </LinkContainer>
      </OuterContainer>
    </Box>
  ) : (
    <Container
      sx={{
        height: '100vh',
        display: 'grid',
        gridTemplateRows: '1fr 1fr 1fr 1fr',
        padding: '0',
      }}
    >
      <Link href='/api/auth/login'>
        <Div index='1'>
          {/*   <Button
          size='small'
          variant='contained'
          href='/api/auth/login'
          sx={{ color: 'text.primary', margin: '10px 0' }}
        >
          Logga in
        </Button> */}
          <Typography
            variant='h1'
            noWrap
            sx={{
              textDecoration: 'none',
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            Log in
          </Typography>
        </Div>
      </Link>
      <Div index='2'>
        <Link href='/friends'>
          <Typography
            variant='h1'
            noWrap
            sx={{
              textDecoration: 'none',
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            About
          </Typography>
        </Link>
      </Div>
      <Div index='3'>
        <Link href='/friends'>
          <Typography
            variant='h1'
            noWrap
            sx={{
              textDecoration: 'none',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            Hello
          </Typography>
        </Link>
      </Div>
      <Div index='4'>
        <Link href='/friends'>
          <Typography
            variant='h1'
            noWrap
            sx={{
              textDecoration: 'none',
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            Party
          </Typography>
        </Link>
      </Div>
    </Container>
  );
};

const Div = styled('div')(({ theme, index }) => ({
  backgroundColor:
    (index === '1' && theme.palette.primary.first) ||
    (index === '2' && theme.palette.primary.second) ||
    (index === '3' && theme.palette.primary.third) ||
    (index === '4' && theme.palette.primary.fourth),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.main,
  },
}));

const OuterContainer = styled('div')(({ theme }) => ({
  color: 'black',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  padding: '0',
}));

const LinkContainer = styled('div')(({ theme, href }) => ({
  backgroundColor:
    router.asPath === href
      ? theme.palette.primary.first
      : theme.palette.primary.second,
  /* padding: theme.spacing(0, 2), */
  height: '100%',
  padding: '5px 10%',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
}));
