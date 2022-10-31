import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
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
import { Footer } from 'components/Footer';
import { POPULAR_URL } from 'utils/urls';
import Link from 'next/link';
import { A } from 'styles/theme';
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { addTune, getUser } from 'services/local';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { User } from '@prisma/client';
import { NextPage } from 'next';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { getMyCache } from 'services/functions';

const Tunes: NextPage<{}> = () => {
  const [popularList, setPopularList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { user } = useUser();

  const [userWithId, setUserWithId] = useState<User>();
  const [mapLearn, setMapLearn] = useState([]);
  const [mapKnow, setMapKnow] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchUserWithId = async () => {
      if (user && user.email) {
        const newUserWithId = await getUser(user.sid as string);

        if (newUserWithId.success) {
          setUserWithId(newUserWithId.data);
          setMapLearn(
            newUserWithId.data.starredTunes.map(
              (tunes: { sessionId: number }) => tunes.sessionId
            )
          );
          setMapKnow(
            newUserWithId.data.knowTunes.map(
              (tunes: { sessionId: number }) => tunes.sessionId
            )
          );
          setLoading(false);
        }
      }
    };

    fetchUserWithId();
  }, [user]);

  useEffect(() => {
    const getPopularTunes = async () => {
      const data = await getMyCache(POPULAR_URL(page));
      setPopularList(data.tunes);
      setLoading(false);
    };

    getPopularTunes();
  }, [page]);

  const onPaginationChangeHandle = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const onKnowHandle = (tuneID: number, userEmail: string) => {
    addTune(tuneID, userEmail, 'know');
  };

  const onLearnHandle = (tuneID: number, userEmail: string) => {
    addTune(tuneID, userEmail, 'learn');
  };

  if (popularList && mapLearn && mapKnow && !loading) {
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
        {/* <SearchTunes /> */}
        <Container
          maxWidth='sm'
          sx={{
            borderRadius: 2,
            boxShadow: 20,
            fontWeight: 'fontWeightLight',
            width: '95%',
            paddingY: '10px',
            marginY: '30px',
            backgroundColor: 'primary.contrastText',
          }}
        >
          <Typography textAlign='center' variant='h1'>
            Popular tunes
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
                <TableCell>
                  <StarBorderIcon />
                </TableCell>
                <TableCell>Know</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {popularList.map((tune) => (
                <TableRow
                  key={tune.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell component='th' scope='row'>
                    <Link
                      href={{
                        pathname: `/detailedtune/[slug]`,
                        query: { slug: `${tune.id}` },
                      }}
                    >
                      <Typography
                        variant='body1'
                        sx={{
                          fontSize: '1rem',
                          fontWeight: '300',
                          color: 'text.primary',
                          display: 'inline',
                          textAlign: 'center',
                          fontFamily: 'Roboto',
                          margin: '1px',

                          '&:hover': {
                            color: 'text.primary',
                            backgroundColor: 'deeppink',
                            cursor: 'pointer',
                          },
                        }}
                      >
                        {tune.name}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell
                    component='th'
                    scope='row'
                    sx={{ padding: '0', margin: '0' }}
                  >
                    <Button
                      size='small'
                      variant='text'
                      sx={{
                        padding: '0',
                        margin: '0',
                        color: 'primary.main',
                      }}
                      onClick={() => onLearnHandle(tune.id, user.email)}
                    >
                      {mapLearn.includes(tune.id) ? (
                        <StarIcon />
                      ) : (
                        <StarBorderIcon />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {mapKnow.includes(tune.id) ? (
                      <Button
                        size='small'
                        variant='outlined'
                        sx={{ color: 'secondary.main' }}
                        onClick={() => onKnowHandle(tune.id, user.email)}
                      >
                        Know
                      </Button>
                    ) : (
                      <Button
                        size='small'
                        sx={{
                          color: 'text.primary',
                          backgroundColor: 'primary.main',
                        }}
                        variant='contained'
                        onClick={() => onKnowHandle(tune.id, user.email)}
                      >
                        Know
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{tune.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box
            sx={{
              paddingTop: '50px',
              display: 'flex',
              justifyContent: 'center',
            }}
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
  } else {
    return <LoadingSpinner />;
  }
};
export default withPageAuthRequired<WithPageAuthRequiredProps>(Tunes);
