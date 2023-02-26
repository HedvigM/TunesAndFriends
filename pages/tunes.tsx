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
import { StyledTable } from '../components/Table';
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
import { Menu } from 'components/Menu';
import { Header2 } from 'components/Header2';
import { LoadingSpinner } from 'components/LoadingSpinner';

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

  const onKnowHandle = (tuneID: number) => {
    let newMapKnow = mapKnow.slice();
    newMapKnow.push(tuneID);
    setMapKnow(newMapKnow);
    addTune(tuneID, user.email, 'know');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh',
        }}
      >
        <Container
          maxWidth='sm'
          sx={{
            width: '95%',
            paddingY: '10px',
            marginY: '30px',
          }}
        >
          <Header2>popular tunes</Header2>
          <div style={{ marginTop: '20px' }}>
            {!popularList && <LoadingSpinner />}
            {popularList.map((tune) => (
              <StyledTable
                data={tune}
                onClickHandle={onKnowHandle}
                know={mapKnow.includes(tune.id)}
                pathname='/detailedtune/[slug]'
              />
            ))}
          </div>

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
        <Menu />
      </Box>
    </>
  );
};

export default withPageAuthRequired<WithPageAuthRequiredProps>(Tunes);
