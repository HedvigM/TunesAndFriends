import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Icon,
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
import { POPULAR_URL, TUNE_URL } from 'utils/urls';
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

const Tunes: NextPage<{}> = () => {
  const [popularList, setPopularList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { user } = useUser();
  const router = useRouter();

  const [userWithId, setUserWithId] = useState<User>();
  const [mapLearn, setMapLearn] = useState([]);
  const [mapKnow, setMapKnow] = useState([]);
  const [knowTunes, setKnowTunes] = useState();

  useEffect(() => {
    setLoading(true);
    const fetchUserWithId = async () => {
      if (user && user.email) {
        const newUserWithId = await getUser(user.email);

        if (newUserWithId.success) {
          setUserWithId(newUserWithId.data);
          setMapLearn(
            newUserWithId.data.learnTunes.map(
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
                      <A>{tune.name}</A>
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
                      sx={{ padding: '0', margin: '0' }}
                      onClick={() => onLearnHandle(tune.id, user.email)}
                    >
                      {mapLearn.includes(tune.id) ? (
                        <StarBorderIcon />
                      ) : (
                        <StarIcon />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {mapKnow.includes(tune.id) ? (
                      <Button
                        size='small'
                        variant='outlined'
                        onClick={() => onKnowHandle(tune.id, user.email)}
                      >
                        Know
                      </Button>
                    ) : (
                      <Button
                        size='small'
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
