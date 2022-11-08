import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { styled } from '@mui/material/styles';
import { getUser } from 'services/local';

export const TeasersList = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [logedinUser, setLogedinUser] = useState([]);
  const [mapFollowing, setMapFollowing] = useState([]);

  console.log('mapFollowing', mapFollowing);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      if (user) {
        const fetchedUser = await getUser(user.sid as string);
        if (fetchedUser.success) {
          setLogedinUser(fetchedUser.data);
          setMapFollowing(
            fetchedUser.data.following.map(
              (followedUsers: { name: string }) => {
                return followedUsers.name;
              }
            )
          );

          /*      Promise.all(
            fetchedUser.data.knowTunes.map((tunes: { sessionId: number }) =>
              getMyCache(TUNE_URL(tunes.sessionId)).then((response) => {
                return response.name;
              })
            )
          ).then((values) => {
            setKnowTuneNames(values);
          }); */
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [user]);

  return (
    <>
      {user && mapFollowing ? (
        <>
          <Typography variant={'h1'} sx={{ padding: '10%' }}>
            Welcome, {user.given_name} to the Tunes and friends community!
          </Typography>
          <Box>
            <EmojiBox sx={{ backgroundColor: 'pink' }}>🥑</EmojiBox>
            <ContentBox>
              <EmojiBox sx={{ backgroundColor: 'deepskyblue' }}>👀</EmojiBox>
              <Typography variant={'h2'} sx={{ padding: '0 0 0 10px' }}>
                Your three newest friends:
              </Typography>
            </ContentBox>
            <Box sx={{ padding: '0 0 0 60px' }}>
              {mapFollowing.map((friends) => (
                <Typography key={friends} sx={{ whiteSpace: 'nowrap' }}>
                  ⭐️ {friends}
                </Typography>
              ))}
            </Box>
            <ContentBox>
              <EmojiBox sx={{ backgroundColor: 'mediumaquamarine' }}>
                ☀️
              </EmojiBox>
              <Typography variant={'h2'} sx={{ padding: '0 0 0 10px' }}>
                Your latest starred tunes:
              </Typography>
            </ContentBox>
            <Box sx={{ padding: '0 0 0 60px' }}>
              <Typography sx={{ whiteSpace: 'nowrap' }}>🎻 tunes</Typography>
              <Typography sx={{ whiteSpace: 'nowrap' }}>🎻 tunes</Typography>
              <Typography sx={{ whiteSpace: 'nowrap' }}>🎻 tunes</Typography>
            </Box>

            <ContentBox>
              <EmojiBox sx={{ backgroundColor: 'gold' }}>🦄</EmojiBox>
              <Typography variant={'h2'} sx={{ padding: '0 0 0 10px' }}>
                Your three latest tunes:
              </Typography>
            </ContentBox>
            <Box sx={{ padding: '0 0 0 60px' }}>
              <Typography sx={{ whiteSpace: 'nowrap' }}>🎻 tunes</Typography>
              <Typography sx={{ whiteSpace: 'nowrap' }}>🎻 tunes</Typography>
              <Typography sx={{ whiteSpace: 'nowrap' }}>🎻 tunes</Typography>
            </Box>
            <ContentBox>
              <EmojiBox sx={{ backgroundColor: 'thistle' }}>✨</EmojiBox>
            </ContentBox>
          </Box>
        </>
      ) : (
        <ComponentContainer>
          <GridContainer>
            <Card sx={{ width: 345 }}>
              <CardMedia
                component='img'
                height='140'
                image='/.././assets/plant.jpeg'
                alt='plant'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  Save tunes to your library
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Gather your friends to a session
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 345 }}>
              <CardMedia
                component='img'
                height='140'
                image='/.././assets/violin.jpeg'
                alt='plant'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  Follow your friends
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Follow your friends
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 345 }}>
              <CardMedia
                component='img'
                height='140'
                image='/.././assets/violin2.jpeg'
                alt='plant'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  be reminded of the tunes you have in common
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  be reminded of the tunes you have in common
                </Typography>
              </CardContent>
            </Card>
          </GridContainer>
        </ComponentContainer>
      )}
    </>
  );
};

const EmojiBox = styled('div')(({ theme }) => ({
  height: '50px',
  width: '50px',
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 'xx-large',
  margin: '0',
}));
const ContentBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: '10px 0',
}));

const ComponentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
}));

const GridContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridGap: '10px',
  padding: '30px 0',
  gridTemplateColumns: '1fr',

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
}));
