import { Box, Container, Typography } from '@mui/material';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import React, { useEffect, useState } from 'react';
import { TUNE_URL } from 'utils/urls';
import { useRouter } from 'next/router';

const detailedtune = (tuneID) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const router = useRouter();
  const { pid } = router.query;

  /*
  useEffect(() => {
    setLoading(true);
    fetch(TUNE_URL(tuneID))
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      });
    });
    */

  return (
    <>
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
          Detailed Tune Page! {pid}
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default detailedtune;
