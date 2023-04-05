import React, { useEffect, useState } from "react";
import { Button, styled } from "@mui/material";
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
import { TUNE_URL } from "utils/urls";
import { getMyCache } from "services/functions";
import { Header } from "components/Header";
import { ProfileInfo } from "components/ProfileInfo";
import { TableData, StyledTable } from "components/Table";
import { Menu } from "components/Menu";
import { ProfileImage } from "components/ProfileImage";
import { colors } from "styles/theme";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { StyleBackdButton } from "pages/tune/[slug]";
import {
  ContentContainer,
  LogoContainer,
  OuterAppContainer,
  StickyMenuContainer,
} from "styles/layout";
import { TunesIncommon } from "components/TunesIncommon";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import Link from "next/link";

const Friend: NextPage<{}> = () => {
  const { user } = useUser();
  const [logedinUser, setLogedinUser] = useState<UserWithRelations>();
  const [viewededUser, setViewedUser] = useState<UserWithRelations>();
  const [visitedFriendTunes, setVisitedFriendTunes] =
    useState<UserWithRelations>();
  const [logedinKnowTuneId, setLogedinKnowTunesId] = useState([]);
  const [showCommonTunes, setShowCommonTunes] = useState(false);

  const [mapFollowing, setMapFollowing] = useState([]);
  const [knowTunes, setKnowTunes] = useState<TableData[]>([]);
  const [knowTuneNamesById, setKnowTuneNamesById] = useState([]);
  const [followingButton, setFollowingButton] = useState(true);

  type UserWithRelations = Prisma.UserGetPayload<{
    include: { following: true; followedBy: true; knowTunes: true };
  }>;

  const router = useRouter();
  const { slug: slug } = router.query;

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
        setShowCommonTunes(true);
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

  /* Add new relation vith auth0 instead... Få igång den här funktionen */
  const onClickHandle = (addingEmail: string, addedEmail: string) => {
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

  const onShowCommonTunes = () => {
    setShowCommonTunes(true);
  };
  const onShowFriendsTunes = () => {
    setShowCommonTunes(false);
  };

  const tuneCount = viewededUser?.knowTunes?.length;
  const followersCount = viewededUser?.followedBy?.length;
  const followingCount = viewededUser?.following?.length;

  if (viewededUser && knowTuneNamesById) {
    return (
      <OuterAppContainer>
        <LogoContainer>
          <Header textAlign="left" size="small">
            T&F
          </Header>
        </LogoContainer>
        <ContentContainer>
          {viewededUser && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "row-reverse",
                  paddingTop: "20px",
                }}
              >
                <Header size="small" textAlign="center">
                  {viewededUser.name}
                </Header>

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
                  {user.sub !== slug && (
                    <StyledButton
                      onClick={() => onClickHandle}
                      know={
                        mapFollowing !== undefined &&
                        mapFollowing.includes(viewededUser.id)
                      }
                    >
                      Add
                    </StyledButton>
                  )}
                </div>
                <ProfileInfo
                  profileText={viewededUser.profileText}
                  tunesCount={tuneCount}
                  following={followingCount}
                  followers={followersCount}
                />
              </ProfileContainer>
              <div style={{ padding: "0 20px" }}>
                <Link href="/profile">
                  <SettingsSuggestIcon />
                </Link>
                {user.sub !== slug && (
                  <Button
                    variant={showCommonTunes ? "outlined" : "contained"}
                    size="small"
                    onClick={onShowCommonTunes}
                  >
                    Common tunes
                  </Button>
                )}
                <Button
                  variant={!showCommonTunes ? "outlined" : "contained"}
                  size="small"
                  onClick={onShowFriendsTunes}
                >
                  {user.sub === slug ? "My Tunes" : "FriendsTunes"}
                </Button>

                {showCommonTunes ? (
                  <TunesIncommon
                    logedinKnowTuneId={logedinKnowTuneId}
                    knowTunes={knowTunes !== undefined && knowTunes}
                  />
                ) : (
                  knowTunes?.map((tune) => (
                    <StyledTable
                      key={tune.id}
                      onClickHandle={onKnowHandle}
                      know={
                        logedinKnowTuneId !== undefined &&
                        logedinKnowTuneId.includes(tune.id)
                      }
                      pathname="/tune/[slug]"
                      slug={tune.id}
                      data={tune}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </ContentContainer>
        <StickyMenuContainer>
          <Menu />
        </StickyMenuContainer>
      </OuterAppContainer>
    );
  } else {
    return <LoadingSpinner />;
  }
};
export default withPageAuthRequired<WithPageAuthRequiredProps>(Friend);

export const ProfileContainer = styled("div")`
  padding: 20px 0;
  display: flex;
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
