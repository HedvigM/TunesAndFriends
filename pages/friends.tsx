import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import {
  Button,
  CircularProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { listUsers } from 'services/local';

export default function Friends() {
  const { user } = useUser();
  const router = useRouter();
  const [usersList, setUsersList] = useState();
  const [loading, setLoading] = useState(false);

  /*  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }); */

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
  console.log('LIST:', usersList);

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
          <CircularProgress color='primary' />
        </Container>
        <Footer />
      </>
    );
  }

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
        {usersList &&
          usersList.map((user) => (
            <Table
              key={user.id}
              sx={{
                maxWidth: '500px',
                borderTop: '2px solid black',
              }}
            >
              <TableBody>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Typography textAlign='left' variant='body1'>
                      {user.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography textAlign='left' variant='body1'>
                      lägg till/ ta bort vän
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={{
                        pathname: `/friend/[slug]`,
                        query: { slug: `${user.id}` },
                      }}
                    >
                      <a>Link to friend!</a>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
      </Container>

      <Footer />
    </>
  );
}
