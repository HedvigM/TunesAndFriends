import React, { useEffect, useState } from 'react';
import {
  Box,
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
import { DataGrid } from '@mui/x-data-grid';
import { A } from 'styles/theme';

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

  console.log('tunes', popularList[0]);

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

        {/* data presentation nr: 2 */}
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={popularList.map((tune) => ({
              id: tune.id,
              tune: tune.name,
              type: tune.type,
            }))}
            columns={[
              { field: 'tune', headerName: 'Tune', width: 130 },
              { field: 'type', headerName: 'Type', width: 130 },
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
        {/* data presentation nr: 3 */}
        {popularList.map((tune) => (
          <Box
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
              <Link
                href={{
                  pathname: `/detailedtune/[slug]`,
                  query: { slug: `${tune.id}` },
                }}
              >
                To detaild tune page!
              </Link>
            </Typography>
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
