import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Pagination,
  PaginationItem,
  Skeleton,
  Stack,
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
import StarIcon from '@mui/icons-material/Star';
import { NextPage } from 'next';
import { getMyCache } from 'services/functions';
import { styled } from '@mui/material';

export const SkeletonTable = () => {
  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
      }}
    >
      <TableCell component='th' scope='row'>
        <Skeleton
          variant='text'
          animation='wave'
          sx={{ width: '100%', margin: '0', fontSize: '1.3rem' }}
        />
      </TableCell>
      <TableCell component='th' scope='row'>
        <Skeleton
          variant='text'
          animation='wave'
          sx={{ width: '100%', margin: '0', fontSize: '1.3rem' }}
        />
      </TableCell>
      <TableCell component='th' scope='row'>
        <Skeleton
          variant='text'
          animation='wave'
          sx={{ width: '100%', margin: '0', fontSize: '1.3rem' }}
        />
      </TableCell>
      <TableCell component='th' scope='row'>
        <Skeleton
          variant='text'
          animation='wave'
          sx={{ width: '100%', margin: '0', fontSize: '1.3rem' }}
        />
      </TableCell>
    </TableRow>
  );
};

const Tunes: NextPage<{}> = () => {
  const [popularList, setPopularList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapStar, setMapStar] = useState([]);
  const [mapKnow, setMapKnow] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const page = parseInt((router.query.page as string) || '1', 10);

  useEffect(() => {
    setLoading(true);
    const fetchUserWithId = async () => {
      if (user) {
        const newUserWithId = await getUser(user?.sub as string);
        if (newUserWithId.success !== undefined) {
          let newStarredTunes = await newUserWithId.data?.starredTunes?.map(
            (tunes: { sessionId: number }) => tunes.sessionId
          );
          setMapStar(newStarredTunes);
          let newKnowTunes = await newUserWithId.data?.knowTunes?.map(
            (tunes: { sessionId: number }) => tunes.sessionId
          );
          setMapKnow(newKnowTunes);
        }
        setLoading(false);
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

  const onKnowHandle = (tuneID: number, userEmail: string) => {
    let newMapKnow = mapKnow.slice();
    newMapKnow.push(tuneID);
    setMapKnow(newMapKnow);
    addTune(tuneID, userEmail, 'know');
  };

  const onStarHandle = (tuneID: number, userEmail: string) => {
    let newMapStar = mapStar.slice();
    newMapStar.push(tuneID);
    setMapStar(newMapStar);
    addTune(tuneID, userEmail, 'learn');
  };

  if (popularList.length > 0 && mapStar && mapKnow && !loading) {
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
                <TableCell
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <StarIcon />
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
                    sx={{
                      padding: '0',
                      margin: '0',
                    }}
                  >
                    <LearnButton
                      included={mapStar.includes(tune.id)}
                      onClick={() => onStarHandle(tune.id, user.email)}
                    >
                      <StarIcon />
                    </LearnButton>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <KnowButton
                      included={mapKnow.includes(tune.id)}
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
            <Stack spacing={2}>
              <Pagination
                count={10}
                page={page}
                color='primary'
                size='small'
                renderItem={(item) => (
                  <PaginationItem
                    component={'a'}
                    href={`/tunes${
                      item.page === 1 ? '' : `?page=${item.page}`
                    }`}
                    {...item}
                  />
                )}
              />
            </Stack>
          </Box>
        </Container>
        <Footer />
      </Box>
    );
  } else {
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
                  <StarIcon />
                </TableCell>
                <TableCell>Know</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <SkeletonTable />
              <SkeletonTable />
              <SkeletonTable />
              <SkeletonTable />
              <SkeletonTable />
              <SkeletonTable />
              <SkeletonTable />
              <SkeletonTable />
              <SkeletonTable />
              <SkeletonTable />
            </TableBody>
          </Table>

          <Box
            sx={{
              paddingTop: '50px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={10}
                page={page}
                color='primary'
                size='small'
                renderItem={(item) => (
                  <PaginationItem
                    component={'a'}
                    href={`/tunes${
                      item.page === 1 ? '' : `?page=${item.page}`
                    }`}
                    {...item}
                  />
                )}
              />
            </Stack>
          </Box>
        </Container>
        <Footer />
      </Box>
    );
  }
};

interface buttonProps {
  readonly included: boolean;
}

const KnowButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'included',
})<buttonProps>((props) => ({
  backgroundColor: props.included
    ? 'inherit'
    : props.theme.palette.primary.main,
  padding: '5px 10px',
  border: 'none',
  borderRadius: '3px',
  boxShadow: '1px 1px 0px deeppink',

  '&:hover': {
    backgroundColor: props.included
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark,
    cursor: 'pointer',
  },
}));

const LearnButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'included',
})<buttonProps>((props) => ({
  backgroundColor: props.included
    ? props.theme.palette.primary.contrastText
    : props.theme.palette.primary.main,
  color: props.included
    ? props.theme.palette.primary.main
    : props.theme.palette.primary.contrastText,
  padding: '5px 10px',
  border: 'none',
  borderRadius: '3px',

  '&:hover': {
    backgroundColor: props.included
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark,
    cursor: 'pointer',
  },
}));

export default withPageAuthRequired<WithPageAuthRequiredProps>(Tunes);
