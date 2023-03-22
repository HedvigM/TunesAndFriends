import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Box, styled } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { Menu } from "components/Menu";
import { Header } from "components/Header";
import { Login } from "components/Login";
import { Data, StyledTable } from "components/Table";
import { getUser } from "services/local";
import { getMyCache } from "services/functions";
import { TUNE_URL } from "utils/urls";

type NewTunes = {
  name: string;
  id: number;
};

const IndexPage: NextPage<{}> = ({}) => {
  const { user } = useUser();
  const [tuneIds, setTuneIds] = useState<number[]>();
  const [tuneNames, setTuneNames] = useState<NewTunes[]>();
  const [friends, setFriends] = useState<Data>();

  useEffect(() => {
    const fetchUserWithId = async () => {
      if (user) {
        const newUserWithId = await getUser(user?.sub as string);
        if (newUserWithId.success) {
          let newTunes: Data = await newUserWithId.data?.knowTunes?.map(
            (tunes: Data) => tunes.sessionId
          );

          setFriends(
            await newUserWithId.data?.following?.flatMap((friends: Data) => {
              return { name: friends.name, id: friends.id };
            })
          );
          setTuneIds(newTunes.slice(0, 3));
        }
      }
    };

    fetchUserWithId();
  }, [user]);

  useEffect(() => {
    if (tuneIds) {
      Promise.all(
        tuneIds.map((tunes) =>
          getMyCache(TUNE_URL(tunes)).then((response) => {
            return response;
          })
        )
      ).then((values) => {
        setTuneNames(values?.map((tune) => ({ name: tune.name, id: tune.id })));
      });
    }
  }, [tuneIds]);

  if (!user) {
    return (
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <Login />
        <Menu />
      </Box>
    );
  }

  const Data = [
    {
      name: "jorid",
      id: 0,
    },
    {
      name: "Jobjörn",
      id: 1,
    },
    {
      name: "Hedvig",
      id: 2,
    },
  ];

  if (user) {
    return (
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          height: "100vh",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Header size={"large"}>Tunes & Friends</Header>
        <Header size={"small"}>Newest Friends</Header>
        <div>
          {friends &&
            friends.map((data: Data) => (
              <ContentContainer>
                <StyledTable
                  onClickHandle={() => {}}
                  know={true}
                  pathname={""}
                  data={data}
                  slug={""}
                />
              </ContentContainer>
            ))}
        </div>
        <Header size={"small"}>Newest Tunes</Header>
        <div>
          {tuneNames &&
            tuneNames.map((tune) => (
              <ContentContainer>
                <StyledTable
                  onClickHandle={() => {}}
                  know={true}
                  pathname={"/tune/[slug]"}
                  data={tune}
                  slug={tune.id}
                />
              </ContentContainer>
            ))}
        </div>
        <Header size={"small"}>Friends newest tunes</Header>
        <div>
          {Data.map((data) => (
            <ContentContainer>
              <StyledTable
                onClickHandle={() => {}}
                know={false}
                pathname={""}
                data={data}
                slug={""}
              />
            </ContentContainer>
          ))}
        </div>
        <StickyMenuContainer>
          <Menu />
        </StickyMenuContainer>
      </Box>
    );
  }
};

export const StickyMenuContainer = styled("div")`
  position: sticky;
  bottom: 0px;
  width: 100%;
`;
const ContentContainer = styled("div")`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CenterDiv = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  width: 100%;
`;

export default IndexPage;
