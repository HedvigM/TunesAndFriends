import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { listUsers } from 'services/local';
import { A } from 'styles/theme';
import { NextPage } from 'next';

const Friends: NextPage<{}> = () => {
  const { user } = useUser();
  const router = useRouter();
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
      <>
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
      </>
    );
  } else {
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
          <CircularProgress color='primary' />
        </Container>
        <Footer />
      </>
    );
  }
};
export default withPageAuthRequired<WithPageAuthRequiredProps>(Friends);
