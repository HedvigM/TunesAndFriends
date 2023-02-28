import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Box, Skeleton, Typography } from '@mui/material';
import Link from 'next/link';
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from '@auth0/nextjs-auth0';
import { addNewRelation, getUser } from 'services/local';
import { NextPage } from 'next';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { getCachedListOfUsers } from 'services/functions';
import { styled } from '@mui/material';
import { Menu } from 'components/Menu';
import { Header2 } from 'components/Header2';
import { StyledTable } from 'components/Table';

interface FriendsProps {
  user: {
    auth0UserId: string;
    createdAt: Date;
    email: string;
    id: number;
    name: string;
    profileText?: string;
    role: 'BASIC' | 'ADMIN';
    town: 'string';
  };
}

const Friends: NextPage<{}> = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapFriendsId, setMapFriendsId] = useState([]);
  const [friendsArray, setFiendsArray] = useState<string[]>([]);
  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    const getUsersList = async (user) => {
      const data = await getCachedListOfUsers(user);
      setUsersList(data);
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

  useEffect(() => {
    setLoading(true);
    const fetchUserWithId = async () => {
      if (user) {
        const newUserWithId = await getUser(user?.sub as string);
        if (newUserWithId.success !== undefined) {
          let newFrindsArray = await newUserWithId.data?.following.map(
            (friend: { auth0UserId: string }) => friend.auth0UserId
          );
          setFiendsArray(newFrindsArray);
        }
        setLoading(false);
      }
    };

    fetchUserWithId();
  }, [user]);

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

          {usersList
            .filter((item) => item.email !== user.email)
            .map((friend) => (
              <div style={{ marginTop: '20px' }}>
                <StyledTable
                  onClickHandle={() =>
                    onClickHandle(user.email, friend.email, friend.auth0UserId)
                  }
                  know={friendsArray.includes(friend.auth0UserId)}
                  data={friend}
                  pathname='/friend/[slug]'
                />
              </div>
            ))}
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
