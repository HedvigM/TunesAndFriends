import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import {
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from '@auth0/nextjs-auth0';
import { listUsers } from 'services/local';
import { A } from 'styles/theme';
import { NextPage } from 'next';
import { LoadingSpinner } from 'components/LoadingSpinner';

const Friends: NextPage<{}> = () => {
  const [usersList, setUsersList] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchListOfUsers = async () => {
      const fetchedList = await listUsers();
      if (fetchedList.success) {
        setUsersList(fetchedList.data);
      }
      setLoading(false);
    };

    fetchListOfUsers();
  }, []);

  if (usersList && !loading) {
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
          maxWidth='sm'
          sx={{
            borderRadius: 2,
            boxShadow: 20,
            fontWeight: 'fontWeightLight',
            width: '75%',
            paddingY: '10px',
            marginY: '30px',
          }}
        >
          <Typography textAlign='center' variant='h1'>
            The Friends page
          </Typography>

          <Table size='small' sx={{ margin: '0', padding: '0' }}>
            <TableHead
              sx={{
                padding: '0',
                margin: '0',
              }}
            >
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>town</TableCell>
                <TableCell>friends?</TableCell>
              </TableRow>
            </TableHead>
            {usersList.map((user) => (
              <TableBody>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Link
                      href={{
                        pathname: `/friend/[slug]`,
                        query: { slug: `${user.id}` },
                      }}
                    >
                      <A>{user.name}</A>
                    </Link>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {user.town}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {' '}
                    <Button
                      size='small'
                      variant='text'
                      sx={{ padding: '0', margin: '0' }}
                    >
                      XX
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </Container>

        <Footer />
      </Box>
    );
  } else {
    return <LoadingSpinner />;
  }
};
export default withPageAuthRequired<WithPageAuthRequiredProps>(Friends);
