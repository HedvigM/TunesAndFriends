import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
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
/* Profile page and friend page is the same...  */

const Friend: NextPage<{}> = () => {
  const { user } = useUser();
  const [databaseUser, setDatabaseUser] = useState<UserWithRelations>();
  const [loading, setLoading] = useState(false);
  const [knowTuneNames, setKnowTuneNames] = useState([]);
  const [userById, setUserById] = useState<UserWithRelations>();
  const [knowTuneNamesById, setKnowTuneNamesById] = useState([]);
  const [mapFollowing, setMapFollowing] = useState([]);
  const [followingButton, setFollowingButton] = useState(true);

  type UserWithRelations = Prisma.UserGetPayload<{
    include: { following: true; followedBy: true };
  }>;

  const router = useRouter();
  const { slug: slug } = router.query;

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
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
            setLoading(false);
          });
          setLoading(false);
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
            setLoading(false);
          });
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [user]);

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
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                maxWidth: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'center',
              }}
            >
              {databaseUser.id.toString() !== slug ? (
                <Typography
                  variant='h1'
                  textAlign='left'
                  sx={{
                    padding: '5px',
                    wordBreak: 'break-word',
                  }}
                >
                  {userById.name}
                </Typography>
              ) : (
                <Typography
                  variant='h1'
                  textAlign='left'
                  sx={{
                    padding: '5px',
                    wordBreak: 'break-word',
                  }}
                >
                  {databaseUser.name}
                </Typography>
              )}
              {databaseUser.id.toString() !== slug ? (
                <Typography
                  variant='h2'
                  sx={{
                    padding: '5px',

                    wordBreak: 'break-word',
                  }}
                >
                  {userById.town}
                </Typography>
              ) : (
                <Typography textAlign='center' variant='h2'>
                  {databaseUser.town}
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {databaseUser.id.toString() !== slug ? (
              <Avatar
                alt='users avatar'
                sx={{ width: 100, height: 100 }}
                src={user.picture}
              />
            ) : (
              <Avatar
                alt='users avatar'
                sx={{ width: 100, height: 100 }}
                src={user.picture}
              />
            )}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: '50px',
              }}
            >
              <Box sx={{ padding: '10px' }}>
                {databaseUser.id.toString() !== slug ? (
                  <Box>
                    <Typography textAlign='left' variant='body1'>
                      <b>{knowTuneNamesById.length}</b>
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Typography textAlign='left' variant='body1'>
                      <b>{knowTuneNames.length}</b>
                    </Typography>
                  </Box>
                )}
                <Typography variant='body1'>tunes</Typography>
              </Box>
              <Box sx={{ padding: '10px' }}>
                {databaseUser.id.toString() !== slug ? (
                  <Box>
                    <Typography textAlign='left' variant='body1'>
                      {userById.followedBy ? (
                        <b>{userById.followedBy.length}</b>
                      ) : (
                        <b>0</b>
                      )}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Typography textAlign='left' variant='body1'>
                      {databaseUser.followedBy ? (
                        <b>{databaseUser.followedBy.length}</b>
                      ) : (
                        <b>0</b>
                      )}
                    </Typography>
                  </Box>
                )}
                <Typography variant='body1'>följare</Typography>
              </Box>
              <Box sx={{ padding: '10px' }}>
                {databaseUser.id.toString() !== slug ? (
                  <Box>
                    <Typography textAlign='left' variant='body1'>
                      {userById.following ? (
                        <b>{userById.following.length}</b>
                      ) : (
                        <b>0</b>
                      )}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Typography textAlign='left' variant='body1'>
                      {databaseUser.following ? (
                        <b>{databaseUser.following.length}</b>
                      ) : (
                        <b>0</b>
                      )}
                    </Typography>
                  </Box>
                )}
                <Typography variant='body1'>följer</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ padding: '10px' }}>
            {databaseUser.id.toString() !== slug ? (
              <Box>
                <Typography textAlign='left' variant='body1'>
                  <b>{userById.name}</b>
                </Typography>
                <Typography textAlign='left' variant='body1'>
                  {userById.profileText}
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography textAlign='left' variant='body1'>
                  <b>{databaseUser.name}</b>
                </Typography>
                <Typography textAlign='left' variant='body1'>
                  {databaseUser.profileText}
                </Typography>
              </Box>
            )}
          </Box>
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
                onClick={() => onClickHandle(user.email, userById.email)}
              >
                Unfollow {<KeyboardArrowDown />}
              </Button>
            ) : (
              <Button
                variant='contained'
                size='medium'
                onClick={() => onClickHandle(user.email, userById.email)}
              >
                Follow {<KeyboardArrowDown />}
              </Button>
            )}
          </Box>

          {databaseUser.id.toString() !== slug ? (
            <>
              <Box sx={{ padding: '50px 0' }}>
                {knowTuneNamesById && (
                  <>
                    <Table size='small' sx={{ margin: '0', padding: '0px' }}>
                      <TableHead
                        sx={{
                          padding: '0',
                          margin: '0',
                        }}
                      >
                        <TableRow>
                          <TableCell>Tunes</TableCell>
                          <TableCell>Tunes incommon</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {knowTuneNamesById.map((tune) => (
                          <TableRow key={tune.id}>
                            <TableCell>
                              <Typography variant='body1'>{tune}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                )}
              </Box>
            </>
          ) : (
            <Box sx={{ padding: '50px 0' }}>
              {knowTuneNames && (
                <Table size='small' sx={{ margin: '0', padding: '0px' }}>
                  <TableHead
                    sx={{
                      padding: '0',
                      margin: '0',
                    }}
                  >
                    <TableRow>
                      <TableCell>Tune</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {knowTuneNames.map((tune) => (
                      <TableRow key={tune.id}>
                        <TableCell>
                          <Typography variant='body1'>{tune}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Box>
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
