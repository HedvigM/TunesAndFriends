import { Box, Typography } from '@mui/material';
import React from 'react';
import plant from '../../../assets/plant.jpeg';
import Image from 'next/image';

export const ImageBG = () => {
  return (
    <Box>
      {/*  <Image
        src='/../../../assets/plant.jpeg'
        height='100%'
        width='100%'
        fit='fill'
        duration={3000}
        easing='cubic-bezier(0.7, 0, 0.6, 1)'
        showLoading={true}
        errorIcon={true}
        shift={null}
        distance='100px'
        shiftDuration={900}
        bgColor='inherit'
      /> */}
      <Typography
        variant={'h2'}
        mt={2}
        align={'center'}
        sx={{ padding: '100px' }}
      ></Typography>
    </Box>
  );
};
