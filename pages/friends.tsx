import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import {
  Box,
  Button,
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
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from '@auth0/nextjs-auth0';
import { addNewRelation, listUsers } from 'services/local';
import { A } from 'styles/theme';
import { NextPage } from 'next';
import { LoadingSpinner } from 'components/LoadingSpinner';

const Friends: NextPage<{}> = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

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

  const onClickHandle = (addingEmail, addedEmail) => {
    addNewRelation(addingEmail, addedEmail);
  };

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
            {usersList
              .filter((item) => item.email !== user.email)
              .map((databaseUser) => (
                <TableBody key={databaseUser.id}>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      <Link
                        href={{
                          pathname: `/friend/[slug]`,
                          query: { slug: `${databaseUser.id}` },
                        }}
                      >
                        <A>{databaseUser.name}</A>
                      </Link>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {databaseUser.town}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {' '}
                      <Button
                        size='small'
                        variant='contained'
                        sx={{ padding: '0', margin: '0' }}
                        onClick={() => {
                          onClickHandle(user.email, databaseUser.email);
                        }}
                      >
                        add friend
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
