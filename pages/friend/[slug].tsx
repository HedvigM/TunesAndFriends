import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Button } from "@mui/material";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { addNewRelation, getUser } from "services/local";
import { Prisma } from "@prisma/client";
import { NextPage } from "next";
import { LoadingSpinner } from "components/LoadingSpinner";
import { KeyboardArrowDown } from "@mui/icons-material";
import { TUNE_URL } from "utils/urls";
import { Presentation } from "components/profile/presentation";
import { MapTunes } from "components/profile/MapTunes";
import { getMyCache } from "services/functions";
import { Header2 } from "components/Header2";
import { ProfileInfo } from "components/ProfileInfo";

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
    include: { following: true; followedBy: true; knowTunes: true };
  }>;

  const router = useRouter();
  const { slug: slug } = router.query;
  /* 
  userById = slugFriend
  databaseUser = loged in friend
  */

  /* At the moment this exact function is in two places. fetching users the same way "friend" or loged in user. */
  useEffect(() => {
    const fetchUser = async () => {
      if (slug) {
        const fetchedUser = await getUser(slug as string);
        if (fetchedUser.success) {
          setUserById(fetchedUser.data);
          /* Here is to look when solving the tunes id routing */
          /*    Promise.all(
            fetchedUser.data.knowTunes.map((tunes: { sessionId: number }) =>
              getMyCache(TUNE_URL(tunes.sessionId)).then(
                (response) => response.name
              )
            )
          ).then((values) => {
            setKnowTuneNamesById(values);
          }); */
        }
      }
    };

    fetchUser();
  }, [slug]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      if (user) {
        const fetchedUser = await getUser(user.sub as string);
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
              getMyCache(TUNE_URL(tunes.sessionId)).then((response) => {
                return response.name;
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
              getMyCache(TUNE_URL(tunes.sessionId)).then((response) => {
                return response.name;
              })
            )
          ).then((values) => {
            setCommonTunes(values);
          });
        }
      });
    }
  }, [userById, databaseUser]);

  /* Add new relation vith auth0 instead... */
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Container maxWidth='sm'>
          <Header2>Name</Header2>
          <ProfileInfo />
          {/* {databaseUser.auth0UserId.toString() !== slug ? (
            <Presentation user={userById} tunes={knowTuneNamesById} />
          ) : (
            <Presentation user={databaseUser} tunes={knowTuneNames} />
          )}

          <Box
            sx={{
              padding: "10px 100px",
              display: "flex",
              justifyContent: "left",
            }}
          >
            {databaseUser.auth0UserId.toString() === slug ? (
              <Button
                disabled
                variant='outlined'
                size='medium'
                sx={{ display: "none" }}
              >
                Unfollow {<KeyboardArrowDown />}
              </Button>
            ) : followingButton ? (
              <Button disabled variant='outlined' size='medium'>
                Unfollow {<KeyboardArrowDown />}
              </Button>
            ) : (
              <Button
                variant='contained'
                size='medium'
                sx={{ color: "primary.contrastText" }}
                onClick={() => onClickHandle(user.email, userById.email)}
              >
                Follow {<KeyboardArrowDown />}
              </Button>
            )}
          </Box>
          {databaseUser.auth0UserId.toString() !== slug ? (
            <MapTunes tunes={knowTuneNamesById} commonTunes={commonTunes} />
          ) : (
            <MapTunes tunes={knowTuneNames} />
          )}
        */}
        </Container>
      </Box>
    );
  } else {
    return <LoadingSpinner />;
  }
};
export default withPageAuthRequired<WithPageAuthRequiredProps>(Friend);
