import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from '@auth0/nextjs-auth0';
import { addNewRelation, listUsers } from 'services/local';
import { NextPage } from 'next';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { getCachedListOfUsers } from 'services/functions';

const Friends: NextPage<{}> = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [relationButton, setRelationButton] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getUsersList = async (user) => {
      const data = await getCachedListOfUsers(user);
      setUsersList(data);
      setLoading(false);
    };
    getUsersList(user);
  }, []);

  const onClickHandle = (addingEmail, addedEmail) => {
    addNewRelation(addingEmail, addedEmail);
    setRelationButton(false);
  };

  if (usersList && !loading) {
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
          maxWidth='sm'
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

          <Table size='small' sx={{ margin: '0', padding: '0' }}>
            <TableHead
              sx={{
                padding: '0',
                margin: '0',
              }}
            >
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>town</TableCell>
                <TableCell>friends?</TableCell>
              </TableRow>
            </TableHead>
            {usersList
              .filter((item) => item.email !== user.email)
              .map((fetchedListOfFriends) => (
                <TableBody key={fetchedListOfFriends.auth0UserId}>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      <Link
                        href={{
                          pathname: `/friend/[slug]`,
                          query: {
                            slug: `${fetchedListOfFriends.auth0UserId}`,
                          },
                        }}
                      >
                        <Typography
                          variant='body1'
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 300,
                            color: 'text.primary',
                            display: 'inline',
                            textAlign: 'center',
                            fontFamily: 'Roboto',
                            margin: '1px',
                            padding: '0 3px',
                            ':hover': {
                              color: 'text.primary',
                              backgroundColor: 'deeppink',
                              cursor: 'pointer',
                              padding: '0 3px',
                            },
                          }}
                        >
                          {fetchedListOfFriends.name}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {fetchedListOfFriends.town}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {' '}
                      <Button
                        size='small'
                        variant='contained'
                        sx={{
                          padding: '0 3px',
                          margin: '0',
                          color: 'text.primary',
                        }}
                        onClick={() => {
                          onClickHandle(user.email, fetchedListOfFriends.email);
                        }}
                      >
                        add friend
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </Container>

        <Footer />
      </Box>
    );
  } else {
    return <LoadingSpinner />;
  }
};
export default withPageAuthRequired<WithPageAuthRequiredProps>(Friends);
