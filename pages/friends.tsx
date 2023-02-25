import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import {
  Box,
  Skeleton,
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
import { Menu } from 'components/Menu';
import { Header2 } from 'components/Header2';

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

      /* setMapFriendsId(data.map((user) => user.auth0UserId)); */
    };
    getUsersList(user);
    setLoading(false);
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
        <Container
          maxWidth='sm'
          sx={{
            width: '75%',
            paddingY: '10px',
            marginY: '30px',
          }}
        >
          <Header2>Friends</Header2>

          <Table size='small' sx={{ margin: '0', padding: '0' }}>
            <TableHead
              sx={{
                padding: '0',
                margin: '0',
              }}
            >
              <TableRow>
                <TableCell sx={{ padding: '0 3px', margin: '0' }}>
                  Name
                </TableCell>
                <TableCell sx={{ padding: '0 3px', margin: '0' }}>
                  town
                </TableCell>
                <TableCell sx={{ padding: '0 3px', margin: '0' }}>
                  friends
                </TableCell>
              </TableRow>
            </TableHead>
            {usersList
              .filter((item) => item.email !== user.email)
              .map((fetchedListOfFriends) => (
                <TableBody key={fetchedListOfFriends.auth0UserId}>
                  <TableRow>
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{
                        padding: '5px 0',
                        margin: '0',
                        maxWidth: '150px',
                        overflow: 'hidden',
                      }}
                    >
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
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{ padding: '5px', margin: '0' }}
                    >
                      {fetchedListOfFriends.town}
                    </TableCell>
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{ padding: '0', margin: '0' }}
                    >
                      {' '}
                      <FriendsButton
                        included={mapFriendsId.includes(
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

        <Menu />
      </Box>
    );
  } else {
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
            width: '75%',
            paddingY: '10px',
            marginY: '30px',
          }}
        >
          <Typography textAlign='center' variant='h1'>
            The Friends page
          </Typography>

          <Skeleton
            variant='rectangular'
            animation='wave'
            height={30}
            sx={{ width: '100%', margin: ' 5px 0' }}
          />
          <Skeleton
            variant='rectangular'
            animation='wave'
            height={30}
            sx={{ width: '100%', margin: '5px 0' }}
          />
          <Skeleton
            variant='rectangular'
            animation='wave'
            height={30}
            sx={{ width: '100%', margin: '5px 0' }}
          />
        </Container>

        <Footer />
      </Box>
    );
  }
};

interface buttonProps {
  readonly included: boolean;
}

const FriendsButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'included',
})<buttonProps>((props) => ({
  backgroundColor: props.included
    ? 'inherit'
    : props.theme.palette.primary.main,
  padding: '5px 10px',
  border: 'none',
  borderRadius: '3px',
  boxShadow: '1px 1px 0px deeppink',

  '&:hover': {
    backgroundColor: props.included
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark,
    cursor: 'pointer',
  },
}));
export default withPageAuthRequired<WithPageAuthRequiredProps>(Friends);
