import React from 'react';
import { NextPage } from 'next';
import { Box } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { Menu } from 'components/Menu';

const IndexPage: NextPage<{}> = ({}) => {
  const { isLoading } = useUser();

  if (!isLoading) {
    return (
      <Box
        sx={{
          height: '100vh',
        }}
      >
        <Menu />
      </Box>
    );
  } else {
    return <LoadingSpinner />;
  }
};

export default IndexPage;
