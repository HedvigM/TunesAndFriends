import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Button, styled } from "@mui/material";
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
import { Header } from "components/Header";
import { ProfileInfo } from "components/ProfileInfo";
import { Data, StyledTable } from "components/Table";
import { Menu } from "components/Menu";
import { ProfileImage } from "components/ProfileImage";

const Friend: NextPage<{}> = () => {
  const { user } = useUser();
  const [databaseUser, setDatabaseUser] = useState<UserWithRelations>();
  const [loading, setLoading] = useState(false);
  const [knowTunes, setKnowTunes] = useState<Data[]>([]);
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

  console.log({ knowTunes });
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
                return response;
              })
            )
          ).then((values) => {
            console.log("values", values);

            setKnowTunes(
              values?.map((tune) => ({ name: tune.name, id: tune.id }))
            );
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

  const tuneCount = userById?.knowTunes?.length;
  const followersCount = userById?.followedBy?.length;
  const followingCount = userById?.following?.length;

  if (databaseUser && userById && knowTuneNamesById && !loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Container maxWidth="sm">
          {userById && (
            <>
              <Header>{userById.name}</Header>
              <ProfileContainer>
                <ProfileImage size={"small"} />
                <ProfileInfo
                  profileText={userById.profileText}
                  tunesCount={tuneCount}
                  following={followingCount}
                  followers={followersCount}
                />
              </ProfileContainer>
              {knowTunes?.map((tune) => (
                <StyledTable
                  onClickHandle={function (id: number): void {
                    throw new Error("Function not implemented.");
                  }}
                  know={false}
                  pathname={""}
                  data={tune}
                />
              ))}
            </>
          )}
        </Container>
        <Menu />
      </Box>
    );
  } else {
    return <LoadingSpinner />;
  }
};
export default withPageAuthRequired<WithPageAuthRequiredProps>(Friend);

export const ProfileContainer = styled("div")`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
