import { Box, Button, Link, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';
import { useUser } from '@auth0/nextjs-auth0';

export const Header = () => {
  const { user } = useUser();
  return user ? (
    <StyledHeader>
      <StyledLogo>
        <Typography variant={'h1'}>Tunes & Friends</Typography>
        <Typography variant={'subtitle1'}>Your tune reminder</Typography>
      </StyledLogo>
      <LinkBox>
        <StyledLink href='/start'>
          <a>Tunes and friends</a>
        </StyledLink>
        <StyledLink href='/first-post'>
          <a>This page!</a>
        </StyledLink>
        <Button
          variant='contained'
          href='/api/auth/logout'
          style={{ display: 'inline' }}
        >
          Log out
        </Button>
      </LinkBox>
    </StyledHeader>
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingX: '10%',
        paddingY: '2%',
        backgroundColor: 'primary.dark',
      }}
    >
      <Typography variant={'h1'} sx={{ paddingX: '2%' }}>
        Tunes & Friends
      </Typography>
      <Button variant='contained' href='/api/auth/login'>
        Logga in
      </Button>
    </Box>
  );
};

const StyledHeader = styled('div')`
  background-color: rgb(27, 104, 8);
  padding: 0% 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLogo = styled('div')`
  text-align: center;
`;

const StyledLink = styled('a')`
  padding: 10px;
  text-decoration: none;
  color: black;
`;
const LinkBox = styled('div')`
  display: flex;
  justify-content: flex-end;
`;
