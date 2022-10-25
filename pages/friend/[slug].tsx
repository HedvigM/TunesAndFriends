import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Box, Button } from '@mui/material';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { addNewRelation, getUser, getUserById } from 'services/local';
import { Prisma } from '@prisma/client';
import { NextPage } from 'next';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { KeyboardArrowDown } from '@mui/icons-material';
import { TUNE_URL } from 'utils/urls';
import { Presentation } from 'components/profile/presentation';
import { MapTunes } from 'components/profile/MapTunes';

const Friend: NextPage<{}> = () => {
  const { user } = useUser();
  const [databaseUser, setDatabaseUser] = useState<UserWithRelations>();
  const [loading, setLoading] = useState(false);
  const [knowTuneNames, setKnowTuneNames] = useState([]);
  const [userById, setUserById] = useState<UserWithRelations>();
  const [knowTuneNamesById, setKnowTuneNamesById] = useState([]);
  const [mapFollowing, setMapFollowing] = useState([]);
  const [followingButton, setFollowingButton] = useState(true);
  const [commonTunes, setCommonTunes] = useState([]);

  type UserWithRelations = Prisma.UserGetPayload<{
    include: { following: true; followedBy: true };
  }>;

  const router = useRouter();
  const { slug: slug } = router.query;

  useEffect(() => {
    const fetchUser = async () => {
      if (slug) {
        const fetchedUser = await getUserById(slug);
        if (fetchedUser.success) {
          setUserById(fetchedUser.data);

          Promise.all(
            fetchedUser.data.knowTunes.map((tunes: { sessionId: number }) =>
              fetch(TUNE_URL(tunes.sessionId))
                .then((res) => res.json())
                .then((data) => {
                  return data.name;
                })
            )
          ).then((values) => {
            setKnowTuneNamesById(values);
          });
        }
      }
    };

    fetchUser();
  }, [slug]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      if (user) {
        const fetchedUser = await getUser(user.email);
        if (fetchedUser.success) {
          setDatabaseUser(fetchedUser.data);
          setMapFollowing(
            fetchedUser.data.following.map((followedUsers: { id: number }) => {
              return followedUsers.id;
            })
          );
          if (userById) {
            if (mapFollowing.includes(userById.id)) {
              setFollowingButton(true);
            } else {
              setFollowingButton(false);
            }
          }

          Promise.all(
            fetchedUser.data.knowTunes.map((tunes: { sessionId: number }) =>
              fetch(TUNE_URL(tunes.sessionId))
                .then((res) => res.json())
                .then((data) => {
                  return data.name;
                })
            )
          ).then((values) => {
            setKnowTuneNames(values);
          });
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    if (databaseUser && userById) {
      const commonTunes = [];
      const mappedUser = userById.knowTunes.map((tunes) => tunes.sessionId);
      databaseUser.knowTunes.forEach((tuneId) => {
        if (mappedUser.includes(tuneId.sessionId)) {
          commonTunes.push(tuneId);

          Promise.all(
            commonTunes.map((tunes) =>
              fetch(TUNE_URL(tunes.sessionId))
                .then((res) => res.json())
                .then((data) => {
                  return data.name;
                })
            )
          ).then((values) => {
            setCommonTunes(values);
          });
        }
      });
    }
  }, [userById, databaseUser]);

  const onClickHandle = (addingEmail, addedEmail) => {
    addNewRelation(addingEmail, addedEmail);
    setFollowingButton(false);
  };

  if (
    databaseUser &&
    userById &&
    knowTuneNames &&
    knowTuneNamesById &&
    !loading
  ) {
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
            paddingY: '10px',
            marginY: '30px',
          }}
        >
          {databaseUser.id.toString() !== slug ? (
            <Presentation
              user={userById}
              tunes={knowTuneNamesById}
              followingButton={followingButton}
            />
          ) : (
            <Presentation
              user={databaseUser}
              tunes={knowTuneNames}
              followingButton={followingButton}
            />
          )}
          <Box
            sx={{
              padding: '10px 100px',
              display: 'flex',
              justifyContent: 'left',
            }}
          >
            {databaseUser.id.toString() !== slug && followingButton === true ? (
              <Button
                variant='outlined'
                size='medium'
                sx={{ color: 'primary.contrastText' }}
                onClick={() => onClickHandle(user.email, userById.email)}
              >
                Unfollow {<KeyboardArrowDown />}
              </Button>
            ) : (
              <Button
                variant='contained'
                size='medium'
                sx={{ color: 'primary.contrastText' }}
                onClick={() => onClickHandle(user.email, userById.email)}
              >
                Follow {<KeyboardArrowDown />}
              </Button>
            )}
          </Box>
          {databaseUser.id.toString() !== slug ? (
            <MapTunes tunes={knowTuneNamesById} commonTunes={commonTunes} />
          ) : (
            <MapTunes tunes={knowTuneNames} />
          )}
        </Container>

        <Footer />
      </Box>
    );
  } else {
    return <LoadingSpinner />;
  }
};
export default withPageAuthRequired<WithPageAuthRequiredProps>(Friend);
