import React, { useEffect, useState } from 'react';
import { Box, Container, Pagination, Typography } from '@mui/material';
import { Header } from 'components/Header';
import { SearchTunes } from 'components/SearchTunes';
import { Footer } from 'components/Footer';
import { POPULAR_URL } from 'utils/urls';
import Link from 'next/link';

export default function Tunes() {
  const [popularList, setPopularList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(POPULAR_URL(page))
      .then((res) => res.json())
      .then((data) => {
        setPopularList(data.tunes);
        setLoading(false);
      });
  }, [page]);

  const onPaginationChangeHandle = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (loading) {
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
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant='h1'>Loading...</Typography>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <SearchTunes />
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
        <Typography textAlign='center' variant='h1'>
          Popular tunes
        </Typography>

        {popularList.map((tune) => (
          <Box
            key={tune.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              border: '1px solid black',
              borderRadius: '5px',
              margin: '20px',
            }}
          >
            <Link href='/'>
              <Typography
                variant='body1'
                sx={{
                  color: 'black',
                  cursor: 'pointer',

                  '&:hover': {
                    color: 'pink',
                  },
                }}
              >
                {tune.name}
              </Typography>
            </Link>
            <Link href='/'>
              <Typography
                variant='body2'
                sx={{
                  color: 'primary.dark',
                  cursor: 'pointer',

                  '&:hover': {
                    color: 'primary.light',
                  },
                }}
              >
                To detaild tune page!
              </Typography>
            </Link>
          </Box>
        ))}
        <Box
          sx={{ paddingTop: '50px', display: 'flex', justifyContent: 'center' }}
        >
          <Pagination
            count={10}
            page={page}
            variant='outlined'
            shape='rounded'
            size='small'
            onChange={onPaginationChangeHandle}
          />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
