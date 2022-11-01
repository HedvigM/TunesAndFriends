import { Box, Container, Typography } from '@mui/material';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TUNE_URL } from 'utils/urls';
import {
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { getMyCache } from 'services/functions';
import { Image } from '@mui/icons-material';

export const Music = (props) => {
  let lineBreak = (string: string) => {
    return string.replaceAll('!', '\n');
  };

  useEffect(() => {
    const abcjsInit = async () => {
      const abcjs = await import('abcjs');
      abcjs.renderAbc('paper', lineBreak(props.abcNotes), {
        responsive: 'resize',
      });
    };
    abcjsInit();
  }, []);

  return <div id='paper'></div>;
};

const detailedtune: NextPage<{}> = () => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({
    name: 'Loading...',
    type: 'Loading...',
  });
  const [key, setKey] = useState('');
  const [abc, setAbc] = useState(
    '|:E2BE dEBE|E2BE AFDF|E2BE dEBE|BABc dAFD:|!d2fd c2ec|defg afge|d2fd c2ec|BABc dAFA|!d2fd c2ec|defg afge|afge fdec|BABc dAFD|'
  );

  const router = useRouter();
  const { slug: slug } = router.query;

  const abcjs = process.browser ? require('abcjs') : null;

  useEffect(() => {
    setLoading(true);
    const getDetailedTune = async () => {
      const data = await getMyCache(TUNE_URL(slug));
      setDetails(data);
      setLoading(false);
    };
    getDetailedTune();
  }, [slug]);

  if (details && !loading) {
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

        <Container maxWidth='lg'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '80%',
              }}
            >
              <Typography variant='h1' textAlign='left'>
                {details.name}
              </Typography>
              <Typography
                variant='h2'
                textAlign='left'
                sx={{ padding: '20px 0' }}
              >
                {details.type}
              </Typography>
            </Box>
          </Box>
          <Music abcNotes={abc} />
        </Container>

        <Footer />
      </Box>
    );
  } else {
    return <LoadingSpinner />;
  }
};
export default withPageAuthRequired<WithPageAuthRequiredProps>(detailedtune);
