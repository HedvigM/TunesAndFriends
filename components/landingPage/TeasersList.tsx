import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';

export const TeasersList = () => {
  const { user } = useUser();
  return (
    <>
      {user ? (
        <>
          <Typography variant={'h1'} sx={{ padding: '10%' }}>
            Welcome, {user.name} to the Tunes and friends community!
          </Typography>
          <Box sx={{ backgroundColor: 'papayawhip' }}>
            <Box
              sx={{
                backgroundColor: 'pink',
                height: '50px',
                width: '100%',
                marginTop: '10px',
              }}
            >
              <Typography variant={'h2'} sx={{ padding: '10%' }}>
                Your three latest tunes you know:
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'gold',
                height: '50px',
                width: '100%',
                marginTop: '10px',
              }}
            >
              <Typography variant={'h2'} sx={{ padding: '10%' }}>
                Your three newest friends:
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'deepskyblue',
                height: '50px',
                width: '100%',
                marginTop: '10px',
              }}
            >
              <Typography variant={'h2'} sx={{ padding: '10%' }}>
                Your latest starred tunes:
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'mediumaquamarine',
                height: '50px',
                width: '100%',
                marginTop: '10px',
              }}
            ></Box>
            <Box
              sx={{
                backgroundColor: 'thistle',
                height: '50px',
                width: '100%',
                marginTop: '10px',
              }}
            ></Box>
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
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
        </Box>
      )}
    </>
  );
};
