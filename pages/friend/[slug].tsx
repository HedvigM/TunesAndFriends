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
import { useQueries, useQuery } from "react-query";

const Friend: NextPage<{}> = () => {
  const { user } = useUser();
  const [logedinUser, setLogedinUser] = useState<UserWithRelations>();
  /* const [viewededUser, setViewedUser] = useState<UserWithRelations>(); */
  const [visitedFriendTunes, setVisitedFriendTunes] =
    useState<UserWithRelations>();
  const [logedinKnowTuneId, setLogedinKnowTunesId] = useState([]);
  const [showCommonTunes, setShowCommonTunes] = useState(false);

  const [mapFollowing, setMapFollowing] = useState([]);
  /*  const [tuneNames, setTuneNames] = useState<TableData[]>([]); */
  const [knowTuneNamesById, setKnowTuneNamesById] = useState([]);
  const [followingButton, setFollowingButton] = useState(true);

  type UserWithRelations = Prisma.UserGetPayload<{
    include: { following: true; followedBy: true; knowTunes: true };
  }>;

  /* Viewed user */
  const { data } = useQuery(["prismaUser", user?.sub], async () => {
    const data = await getUser(user.sub);
    return data;
  });

  const router = useRouter();
  const { slug: slug } = router.query;

  type SessionTuneType = {
    data: {
      name: string;
      id: number;
    }[];
  };

  const trimTunesData = async (tune) => {
    let newTune = await tune;
    if (newTune.name && newTune.id) {
      return { name: newTune.name, id: newTune.id };
    }
  };

  const tunes = useQueries(
    data?.data?.knowTunes?.map(
      (tunes) => {
        return {
          queryKey: ["tunes", tunes.sessionId],
          queryFn: () => trimTunesData(getMyCache(TUNE_URL(tunes.sessionId))),
          /* staleTime: Infinity, */
        };
      },
      {
        enabled: !!data.success,
      }
    )
  );

  console.log("tunes: ", tunes);

  /* get logged in user*/
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

  const tuneCount = data?.data.knowTunes?.length;
  const followersCount = data?.data.followedBy?.length;
  const followingCount = data?.data.following?.length;

  if (data && knowTuneNamesById && data.success && tunes.length > 0) {
    return (
      <OuterAppContainer>
        <LogoContainer>
          <Header textAlign="left" size="small">
            T&F
          </Header>
        </LogoContainer>
        <ContentContainer>
          {data && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "row-reverse",
                  paddingTop: "20px",
                }}
              >
                <Header size="small" textAlign={"center"}>
                  {data.data.name}
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
                      know={mapFollowing.includes(data.data.id)}
                    >
                      Add
                    </StyledButton>
                  )}
                </div>
                <ProfileInfo
                  profileText={data.data.profileText}
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
                    knowTunes={tunes.map((tune) => tune.data)}
                  />
                ) : (
                  tunes.length > 0 &&
                  tunes.map((tune, index) =>
                    tune.status === "success" ? (
                      <StyledTable
                        key={tune.data.id}
                        onClickHandle={onKnowHandle}
                        know={logedinKnowTuneId.includes(tune.data.id)}
                        pathname="/tune/[slug]"
                        slug={tune.data.id}
                        data={tune.data}
                      />
                    ) : (
                      <StyledTable
                        key={index}
                        data={{ id: 0, name: "Loading..." }}
                      />
                    )
                  )
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
