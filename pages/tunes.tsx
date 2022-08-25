import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Header } from 'components/Header';
import { SearchTunes } from 'components/SearchTunes';
import { Footer } from 'components/Footer';
import { POPULAR_URL } from 'utils/urls';
import Link from 'next/link';
import { A } from 'styles/theme';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

export default function Tunes() {
  const [popularList, setPopularList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(POPULAR_URL(page))
      .then((res) => res.json())
      .then((data) => {
        setPopularList(data.tunes);
        setLoading(false);
        if (!user) {
          router.push('/');
        }
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
          <CircularProgress color='secondary' />
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

        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>To detaild page</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {popularList.map((tune) => (
              <TableRow
                key={tune.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {tune.name}
                </TableCell>
                <TableCell>{tune.type}</TableCell>
                <TableCell>
                  {' '}
                  <Link
                    href={{
                      pathname: `/detailedtune/[slug]`,
                      query: { slug: `${tune.id}` },
                    }}
                  >
                    <A>To detaild tune page!</A>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
