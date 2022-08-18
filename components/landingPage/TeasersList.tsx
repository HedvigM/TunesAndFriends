import {
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import PianoIcon from '@mui/icons-material/Piano';
import { Container } from '@mui/system';
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';

export const TeasersList = () => {
  const { user } = useUser();
  return (
    <>
      {user ? (
        <Typography variant={'h1'} sx={{ padding: '10%' }}>
          Welcome, {user.name} to the Tunes and friends community!
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              width: 300,
              height: 300,
              margin: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
              backgroundColor: 'primary.dark',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <PianoIcon color='secondary' sx={{ fontSize: 100 }} />
            <Typography variant={'body1'} sx={{ padding: '10%' }}>
              Gather your friends to a session
            </Typography>
          </Box>
          <Box
            sx={{
              width: 300,
              height: 300,
              margin: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
              backgroundColor: 'primary.dark',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            {' '}
            <PianoIcon color='secondary' sx={{ fontSize: 100 }} />
            <Typography variant={'body1'} sx={{ padding: '10%' }}>
              Mark the tunes you know and the ones you would like to learn.
            </Typography>
          </Box>
          <Box
            sx={{
              width: 300,
              height: 300,
              margin: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
              backgroundColor: 'primary.dark',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <PianoIcon color='secondary' sx={{ fontSize: 100 }} />
            <Typography variant={'body1'} sx={{ padding: '10%' }}>
              Find out which tunes you and your friends have in common.
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};
