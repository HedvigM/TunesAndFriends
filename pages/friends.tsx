import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import {
  Box,
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
import { addNewRelation } from 'services/local';
import { NextPage } from 'next';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { getCachedListOfUsers } from 'services/functions';
import { styled } from '@mui/material';

const Friends: NextPage<{}> = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapFriendsId, setMapFriendsId] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    const getUsersList = async (user) => {
      const data = await getCachedListOfUsers(user);
      setUsersList(data);
      setMapFriendsId(data.map((user) => user.auth0UserId));
      setLoading(false);
    };
    getUsersList(user);
  }, []);

  const onClickHandle = (
    addingEmail: string,
    addedEmail: string,
    addedId: string
  ) => {
    let newMapFriendsId = mapFriendsId.slice();
    newMapFriendsId.push(addedId);
    setMapFriendsId(newMapFriendsId);
    addNewRelation(addingEmail, addedEmail);
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
                      <FriendsButton
                        primary={mapFriendsId.includes(
                          fetchedListOfFriends.auth0UserId
                        )}
                        onClick={() => {
                          onClickHandle(
                            user.email,
                            fetchedListOfFriends.email,
                            fetchedListOfFriends.auth0UserId
                          );
                        }}
                      >
                        know
                      </FriendsButton>
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

const FriendsButton = styled('button')((props) => ({
  backgroundColor: props.primary ? 'inherit' : props.theme.palette.primary.main,
  padding: '5px 10px',
  border: 'none',
  borderRadius: '3px',
  boxShadow: '1px 1px 0px deeppink',

  '&:hover': {
    backgroundColor: props.primary
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark,
    cursor: 'pointer',
  },
}));
export default withPageAuthRequired<WithPageAuthRequiredProps>(Friends);
