import { Box, Typography } from '@mui/material';
import { display } from '@mui/system';
import React from 'react';

export const ImageBG = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
      }}
    >
      <Typography
        variant={'h2'}
        mt={2}
        align={'center'}
        sx={{ padding: '100px' }}
      >
        "Here should be a text that makes you want to create an account"
      </Typography>
    </Box>
  );
};
