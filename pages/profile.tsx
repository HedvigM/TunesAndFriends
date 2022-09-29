import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
import { KeyboardArrowDown } from '@mui/icons-material';
import { TUNE_URL } from 'utils/urls';
import StarIcon from '@mui/icons-material/Star';
/* Profile page and friend page is the same...  */

const Profile: NextPage<{}> = () => {
  const { user } = useUser();
  const [databaseUser, setDatabaseUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [knowTuneNames, setKnowTuneNames] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      if (user) {
        const fetchedUser = await getUser(user.email);
        if (fetchedUser.success) {
          setDatabaseUser(fetchedUser.data);
          Promise.all(
            fetchedUser.data.knowTunes.map((tunes: { sessionId: number }) =>
              fetch(TUNE_URL(tunes.sessionId))
                .then((res) => res.json())
                .then((data) => {
                  return data.name;
                })
            )
          ).then((values) => {
            setKnowTuneNames(values);
            setLoading(false);
          });
          setLoading(false);
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
          <Typography textAlign='center' variant='h1'>
            {databaseUser.name}
          </Typography>
          <Typography textAlign='center' variant='body1'>
            {databaseUser.town}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Avatar
              alt='users avatar'
              sx={{ width: 100, height: 100 }}
              src={user.picture}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: '50px',
              }}
            >
              <Box sx={{ padding: '10px' }}>
                <Typography variant='body1'>
                  <b>siffra</b>
                </Typography>
                <Typography variant='body1'>tunes</Typography>
              </Box>
              <Box sx={{ padding: '10px' }}>
                <Typography variant='body1'>
                  {' '}
                  <b>siffra</b>
                </Typography>
                <Typography variant='body1'>följare</Typography>
              </Box>
              <Box sx={{ padding: '10px' }}>
                <Typography variant='body1'>
                  {' '}
                  <b>siffra</b>
                </Typography>
                <Typography variant='body1'>följer</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ padding: '10px' }}>
            <Typography textAlign='left' variant='body1'>
              <b>{databaseUser.name}</b>
            </Typography>
            <Typography textAlign='left' variant='body1'>
              {databaseUser.profileText}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: '10px 100px',
              display: 'flex',
              justifyContent: 'left',
            }}
          >
            <Button variant='contained' size='medium'>
              Follow {<KeyboardArrowDown />}
            </Button>
          </Box>
          <Box sx={{ padding: '50px 0' }}>
            <Table size='small' sx={{ margin: '0', padding: '0px' }}>
              <TableHead
                sx={{
                  padding: '0',
                  margin: '0',
                }}
              >
                <TableRow>
                  <TableCell>Tune</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {knowTuneNames.map((tune) => (
                  <TableRow>
                    <TableCell>
                      <Typography variant='body1'>{tune}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Container>

        <Footer />
      </Box>
    );
  } else {
    return <LoadingSpinner />;
  }
};
export default withPageAuthRequired<WithPageAuthRequiredProps>(Profile);
