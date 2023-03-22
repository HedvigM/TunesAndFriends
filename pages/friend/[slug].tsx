import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Button, styled } from "@mui/material";
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { addNewRelation, addTune, getUser } from "services/local";
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
import { colors } from "styles/theme";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { StyleBackdButton } from "pages/tune/[slug]";

const Friend: NextPage<{}> = () => {
  const { user } = useUser();
  const [logedinUser, setLogedinUser] = useState<UserWithRelations>();
  const [viewededUser, setViewedUser] = useState<UserWithRelations>();
  const [visitedFriendTunes, setVisitedFriendTunes] =
    useState<UserWithRelations>();
  const [logedinKnowTuneId, setLogedinKnowTunesId] = useState([]);

  const [mapFollowing, setMapFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [knowTunes, setKnowTunes] = useState<Data[]>([]);
  const [knowTuneNamesById, setKnowTuneNamesById] = useState([]);
  const [followingButton, setFollowingButton] = useState(true);
  const [commonTunes, setCommonTunes] = useState([]);

  type UserWithRelations = Prisma.UserGetPayload<{
    include: { following: true; followedBy: true; knowTunes: true };
  }>;

  const router = useRouter();
  const { slug: slug } = router.query;

  /* Get Viewed user (profile and tune names )*/
  useEffect(() => {
    const fetchUser = async () => {
      if (slug) {
        const fetchedUser = await getUser(slug as string);
        if (fetchedUser.success) {
          setViewedUser(fetchedUser.data);
          Promise.all(
            fetchedUser.data.knowTunes.map((tunes: { sessionId: number }) =>
              getMyCache(TUNE_URL(tunes.sessionId)).then((response) => {
                return response;
              })
            )
          ).then((values) => {
            setKnowTunes(
              values?.map((tune) => ({ name: tune.name, id: tune.id }))
            );
          });
        }
      }
    };
    fetchUser();
  }, [slug]);

  /* get loged in user*/
  useEffect(() => {
    const fetchUser = async () => {
      if (user.sub !== slug) {
        const fetchedUser = await getUser(user.sub as string);
        if (fetchedUser.success) {
          setLogedinUser(fetchedUser.data);
          setMapFollowing(
            fetchedUser.data.following.map((followedUsers: { id: number }) => {
              return followedUsers.id;
            })
          );
          setLogedinKnowTunesId(
            fetchedUser.data.knowTunes.map((tune: { sessionId: number }) => {
              return tune.sessionId;
            })
          );
        }
      }
    };
    fetchUser();
  }, [user]);

  /* Add new relation vith auth0 instead... */
  const onClickHandle = (addingEmail, addedEmail) => {
    addNewRelation(addingEmail, addedEmail);
    setFollowingButton(false);
  };
  const onKnowHandle = (tuneId: number) => {
    let newMapKnow = logedinKnowTuneId.slice();
    newMapKnow.push(tuneId);
    setLogedinKnowTunesId(newMapKnow);
    addTune(tuneId, user.email, "know");
  };
  const onBackClickHandle = () => {
    router.back();
  };

  const tuneCount = viewededUser?.knowTunes?.length;
  const followersCount = viewededUser?.followedBy?.length;
  const followingCount = viewededUser?.following?.length;

  if (logedinUser && viewededUser && knowTuneNamesById && !loading) {
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
          {viewededUser && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "row-reverse",
                }}
              >
                <Header size="large">{viewededUser.name}</Header>
                <StyleBackdButton
                  size="small"
                  variant="text"
                  onClick={onBackClickHandle}
                >
                  <ArrowBackIosNewIcon />
                </StyleBackdButton>
              </div>

              <ProfileContainer>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    paddingRight: "10px",
                  }}
                >
                  <ProfileImage size={"small"} />
                  <StyledButton know={mapFollowing.includes(viewededUser.id)}>
                    Add
                  </StyledButton>
                </div>
                <ProfileInfo
                  profileText={viewededUser.profileText}
                  tunesCount={tuneCount}
                  following={followingCount}
                  followers={followersCount}
                />
              </ProfileContainer>
              {knowTunes?.map((tune) => (
                <StyledTable
                  onClickHandle={onKnowHandle}
                  know={logedinKnowTuneId.includes(tune.id)}
                  pathname="/tune/[slug]"
                  slug={tune.id}
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
  /* align-items: center; */
  align-content: center;
  justify-content: center;
`;

type FriendSlugProps = {
  know: boolean;
};

const StyledButton = styled("button")<FriendSlugProps>((props) => ({
  backgroundColor: props.know ? "inherit" : colors.second,
  padding: "5px 10px",
  border: `1px solid ${colors.second}`,
  borderRadius: "3px",

  "&:hover": {
    cursor: "pointer",
  },
}));
