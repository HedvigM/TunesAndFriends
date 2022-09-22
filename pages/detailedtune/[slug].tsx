import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TUNE_URL } from 'utils/urls';
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import { LoadingSpinner } from 'components/LoadingSpinner';

const detailedtune: NextPage<{}> = () => {
  const [loading, setLoading] = useState(false);
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
  const { user } = useUser();
  const abcjs = process.browser ? require('abcjs') : null;

  useEffect(() => {
    setLoading(true);
    fetch(TUNE_URL(slug))
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        if (data.settings) {
          setAbc(data.settings[0].abc);
        }
        setLoading(false);
        if (!user) {
          router.push('/');
        }
      });
  }, [slug]);

  let lineBreak = (string) => {
    return string.replaceAll('!', '\n');
  };

  if (abcjs) {
    abcjs.renderAbc('sheetMusic', lineBreak(abc), { responsive: 'resize' });
  }

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

        <Container
          sx={{
            borderRadius: 2,
            boxShadow: 20,
            fontWeight: 'fontWeightLight',
            width: '75%',
            paddingY: '10px',
            marginY: '30px',
            flexGrow: '1',
          }}
        >
          <Typography variant='h1' textAlign='center'>
            {details.name}
          </Typography>
          <>
            <Typography textAlign='left' variant='body1'>
              Slug: {slug}
            </Typography>
            <Typography variant='body1' textAlign='left'>
              {details.type}
            </Typography>
          </>
        </Container>

        <Container
          sx={{
            borderRadius: 2,
            boxShadow: 20,
            fontWeight: 'fontWeightLight',
            width: '75%',
            paddingY: '10px',
            marginY: '30px',
            flexGrow: '1',
          }}
        >
          <div style={{ width: '100%' }} id='sheetMusic'></div>
        </Container>

        <Footer />
      </Box>
    );
  } else {
    return <LoadingSpinner />;
  }
};
export default withPageAuthRequired<WithPageAuthRequiredProps>(detailedtune);
