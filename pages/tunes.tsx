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
import { Footer } from 'components/Footer';
import { POPULAR_URL } from 'utils/urls';
import Link from 'next/link';
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
import { styled } from '@mui/material';

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
      if (user) {
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
    let newMapKnow = mapKnow.slice();
    newMapKnow.push(tuneID);
    setMapKnow(newMapKnow);
    addTune(tuneID, userEmail, 'know');
  };

  const onStarHandle = (tuneID: number, userEmail: string) => {
    let newMapStar = mapLearn.slice();
    newMapStar.push(tuneID);
    setMapLearn(newMapStar);
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
                    <LearnButton
                      primary={mapLearn.includes(tune.id)}
                      onClick={() => onStarHandle(tune.id, user.email)}
                    >
                      <StarIcon />
                    </LearnButton>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <KnowButton
                      primary={mapKnow.includes(tune.id)}
                      onClick={() => onKnowHandle(tune.id, user.email)}
                    >
                      know
                    </KnowButton>
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

const KnowButton = styled('button')((props) => ({
  backgroundColor: props.primary ? 'inherit' : props.theme.palette.primary.main,
  padding: '5px 10px',
  border: 'none',
  borderRadius: '3px',
  boxShadow: '1px 1px 0px deeppink',

  '&:hover': {
    backgroundColor: props.primary
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark,
    cursor: 'pointer',
  },
}));

const LearnButton = styled('button')((props) => ({
  backgroundColor: props.primary
    ? props.theme.palette.primary.contrastText
    : props.theme.palette.primary.main,
  color: props.primary
    ? props.theme.palette.primary.main
    : props.theme.palette.primary.contrastText,
  padding: '5px 10px',
  border: 'none',
  borderRadius: '3px',

  '&:hover': {
    backgroundColor: props.primary
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark,
    cursor: 'pointer',
  },
}));

export default withPageAuthRequired<WithPageAuthRequiredProps>(Tunes);
