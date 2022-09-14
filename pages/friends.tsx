import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import {
  Button,
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

export default function Friends() {
  const { user } = useUser();
  const router = useRouter();

  /*  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }); */

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
        <Table
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
                  Hej
                </Typography>
              </TableCell>
              <TableCell>
                <Typography textAlign='left' variant='body1'>
                  lägg till/ ta bort vän
                </Typography>
              </TableCell>
              <TableCell>
                <Button>Gå till profil</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>

      <Footer />
    </>
  );
}
