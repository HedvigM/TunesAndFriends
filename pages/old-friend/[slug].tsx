/* TODO: separera inloggad user från viewed user till olika komponenter. */


import { useEffect, useState } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
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
import { ProfileImage } from "components/ProfileImage";
import { Button } from "styles/Button";
import { TunesIncommon } from "components/TunesIncommon";
import Link from "next/link";
import { Page } from "styles/Page";
import styles from "styles/containers.module.scss";

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
    let isMounted = true;

    const fetchUser = async () => {
      if (slug) {
        try {
          const fetchedUser = await getUser(slug as string);
          if (isMounted && fetchedUser.success) {
            console.log("fetch: ", fetchedUser.data);
            setViewedUser(fetchedUser.data as UserWithRelations);
            if (Array.isArray(fetchedUser.data?.knowTunes)) {
              Promise.all(
                fetchedUser.data.knowTunes.map((tunes: { sessionId: number }) =>
                  getMyCache(TUNE_URL(tunes.sessionId)).then((response) => {
                    return response;
                  })
                )
              ).catch((error) => {
                if (isMounted) {
                  console.error("Error fetching tunes:", error);
                }
              });
            }
          }
        } catch (error) {
          if (isMounted) {
            console.error("Error fetching user:", error);
          }
        }
      }
    };
    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  /* get logged in user*/
  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      if (user !== undefined && user.sub !== slug) {
        setShowCommonTunes(true);
        try {
          const fetchedUser = await getUser(user.sub as string);
          if (isMounted && fetchedUser.success) {
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
        } catch (error) {
          if (isMounted) {
            console.error("Error fetching logged in user:", error);
          }
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [user, slug]);

  const onClickHandle = (addingEmail: string, addedEmail: string) => {
    addNewRelation(addingEmail, addedEmail);
    setFollowingButton(false);
  };
  const onKnowHandle = (tuneId: number) => {
    setLoggedinKnowTunesId(prev => [...prev, tuneId]);
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
      <Page>
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

                <Button
                  element="button"
                  active={true}
                  onClick={onBackClickHandle}
                >
                  {`<-- Back`}
                </Button>
              </div>
              <div style= {{
                  padding: "20px 0",
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
              }}>
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
                      {`Settings`}
                    </Link>
                  )}
                </div>
                <ProfileInfo
                  profileText={viewededUser.profileText ?? ""}
                  tunesCount={tuneCount ?? 0}
                  following={followingCount ?? 0}
                  followers={followersCount ?? 0}
                />
              </div>

              <div className={styles.dataContainer}>
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
              </div>
            </>
          )}
      </Page>
    );
  } else {
    return <LoadingSpinner />;
  }
};
export default withPageAuthRequired(Friend);
