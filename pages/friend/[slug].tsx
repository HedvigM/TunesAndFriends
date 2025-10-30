import React, { useEffect, useState } from "react";
import { styled } from "@mui/material";
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
import { Button } from "styles/Button";
import {
  ContentContainer,
  LogoContainer,
  OuterAppContainer,
  StickyMenuContainer,
} from "styles/layout";
import { TunesIncommon } from "components/TunesIncommon";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import Link from "next/link";
import { DataContainer } from "pages/friends";

const Friend: NextPage<{}> = () => {
  const { user } = useUser();
  const [_loggedinUser, setLoggedinUser] = useState<UserWithRelations>();
  const [viewededUser, setViewedUser] = useState<UserWithRelations>();
  const [loggedinKnowTuneId, setLoggedinKnowTunesId] = useState<number[]>([]);
  const [showCommonTunes, setShowCommonTunes] = useState(false);

  const [mapFollowing, setMapFollowing] = useState<number[]>([]);
  const [knowTunes, _setKnowTunes] = useState<TableData[]>([]);
  const [knowTuneNamesById] = useState([]);
  const [_followingButton, setFollowingButton] = useState(true);

  console.log({ user });
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
          console.log("fetch: ", fetchedUser.data);
          setViewedUser(fetchedUser.data as UserWithRelations);
          if (Array.isArray(fetchedUser.data?.knowTunes)) {
            Promise.all(
              fetchedUser.data.knowTunes.map((tunes: { sessionId: number }) =>
                getMyCache(TUNE_URL(tunes.sessionId)).then((response) => {
                  return response;
                })
              )
            )
          }
        }
      }
    };
    fetchUser();
  }, [slug]);

  /* get logged in user*/
  useEffect(() => {
    const fetchUser = async () => {
      if (user !== undefined && user.sub !== slug) {
        setShowCommonTunes(true);
        const fetchedUser = await getUser(user.sub as string);
        if (fetchedUser.success) {
          setLoggedinUser(fetchedUser.data as UserWithRelations);
          if (Array.isArray(fetchedUser.data?.following)) {
          setMapFollowing(
              fetchedUser.data.following.map((followedUsers: { id: number }) => {
                return followedUsers.id;
              })
            );
          }
          setLoggedinKnowTunesId(
            fetchedUser.data?.knowTunes?.map((tune: { sessionId: number }) => tune.sessionId) || []
          );
        }
      }
    };

    fetchUser();
  }, [user]);

  const onClickHandle = (addingEmail: string, addedEmail: string) => {
    addNewRelation(addingEmail, addedEmail);
    setFollowingButton(false);
  };
  const onKnowHandle = (tuneId: number) => {
    let newMapKnow = loggedinKnowTuneId.slice();
    newMapKnow.push(tuneId);
    setLoggedinKnowTunesId(newMapKnow);
    if (user !== undefined && user.email) {
      addTune(tuneId, user.email, "know");
    }
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
          <Header textAlign="left" size="small" color="blue">
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
                <Header size="small" textAlign="center" color="blue">
                  {viewededUser.name}
                </Header>

                <Button
                  element="button"
                  active={true}
                  onClick={onBackClickHandle}
                >
                  <ArrowBackIosNewIcon />
                </Button>
              </div>
              <ProfileContainer>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "5px",
                    paddingRight: "10px",
                  }}
                >
                  <ProfileImage size={"small"} />
                  {user && user.sub !== slug ? (
                    <Button
                      element="button"
                      onClick={() => onClickHandle}
                      active={
                        mapFollowing !== undefined &&
                        mapFollowing.includes(viewededUser.id)
                      }
                    >
                      Add
                    </Button>
                  ) : (
                    <Link href="/profile">
                      <SettingsSuggestIcon />
                    </Link>
                  )}
                </div>
                <ProfileInfo
                  profileText={viewededUser.profileText ?? ""}
                  tunesCount={tuneCount ?? 0}
                  following={followingCount ?? 0}
                  followers={followersCount ?? 0}
                />
              </ProfileContainer>

              <DataContainer>
                <div style={{ display: "flex" }}>
                  {user && user.sub !== slug && (
                    <Button
                      element="button"
                      onClick={onShowCommonTunes}
                      active={showCommonTunes ? false : true}
                    >
                      Common tunes
                    </Button>
                  )}
                  <Button
                    element="button"
                    onClick={onShowFriendsTunes}
                    active={showCommonTunes ? true : false}
                  >
                    {user && user.sub === slug ? "My Tunes" : "FriendsTunes"}
                  </Button>
                </div>
                {showCommonTunes ? (
                  <TunesIncommon
                    logedinKnowTuneId={loggedinKnowTuneId}
                    knowTunes={knowTunes}
                  />
                ) : (
                  knowTunes?.map((tune) => (
                    <StyledTable
                      key={tune.id}
                      onClickHandle={onKnowHandle}
                      know={
                        loggedinKnowTuneId !== undefined &&
                        loggedinKnowTuneId.includes(tune.id)
                      }
                      pathname="/tune/[slug]"
                      slug={tune.id}
                      data={tune}
                    />
                  ))
                )}
              </DataContainer>
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
