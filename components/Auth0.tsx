import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

export const Auth0 = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button  variant="contained" href="/">Log In</Button>;
};