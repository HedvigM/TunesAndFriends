import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { getUser } from 'services/local';
import { User } from '@prisma/client';
import { NextPage } from 'next';
import { LoadingSpinner } from 'components/LoadingSpinner';
/* Profile page and friend page is the same...  */

const Profile: NextPage<{}> = () => {
  const { user } = useUser();
  const [databaseUser, setDatabaseUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const fetchedUser = await getUser(user.email);
        if (fetchedUser.success) {
          setDatabaseUser(fetchedUser.data);
        }
      }
    };

    fetchUser();
  }, [user]);

  if (databaseUser && !loading) {
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
            borderRadius: 2,
            boxShadow: 20,
            fontWeight: 'fontWeightLight',
            width: '75%',
            paddingY: '10px',
            marginY: '30px',
          }}
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'center', padding: '30px' }}
          >
            <Avatar
              alt='users avatar'
              sx={{ width: 100, height: 100 }}
              src={user.picture}
            />
          </Box>
          <Typography
            textAlign='center'
            variant='h1'
            sx={{ borderBottom: '2px solid black' }}
          >
            {databaseUser.name}, {databaseUser.town}
          </Typography>
          <Typography textAlign='center' variant='body1'>
            {databaseUser.profileText}
          </Typography>
          <Button variant='contained'>Friends / become friends</Button>
        </Container>

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
          <Typography variant='h2'>Tunes incommon:</Typography>
        </Container>

        <Footer />
      </Box>
    );
  } else {
    return <LoadingSpinner />;
  }
};
export default withPageAuthRequired<WithPageAuthRequiredProps>(Profile);
