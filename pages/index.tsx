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
import {
  ContentContainer,
  LogoContainer,
  OuterAppContainer,
  StickyMenuContainer,
} from "styles/layout";

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
      <Box>
        <Login />
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
      <OuterAppContainer>
        <LogoContainer>
          <Header textAlign="left" size="small">
            T&F
          </Header>
        </LogoContainer>
        <ContentContainer>
          <Header size={"large"} textAlign="center">
            Tunes & Friends
          </Header>
          <div style={{ padding: "20px 0" }}>
            <Header size={"small"} textAlign={"center"}>
              Newest Friends
            </Header>
            <div>
              {friends &&
                friends.map((data: Data) => (
                  <DataContainer>
                    <StyledTable
                      onClickHandle={() => {}}
                      know={true}
                      pathname={""}
                      data={data}
                      slug={""}
                    />
                  </DataContainer>
                ))}
            </div>
            <Header size={"small"} textAlign="center">
              Newest Tunes
            </Header>
            <div>
              {tuneNames &&
                tuneNames.map((tune) => (
                  <DataContainer>
                    <StyledTable
                      onClickHandle={() => {}}
                      know={true}
                      pathname={"/tune/[slug]"}
                      data={tune}
                      slug={tune.id}
                    />
                  </DataContainer>
                ))}
            </div>
            <Header size={"small"} textAlign="center">
              Friends newest tunes
            </Header>
            <div>
              {Data.map((data) => (
                <DataContainer>
                  <StyledTable
                    onClickHandle={() => {}}
                    know={false}
                    pathname={""}
                    data={data}
                    slug={""}
                  />
                </DataContainer>
              ))}
            </div>
          </div>
        </ContentContainer>
        <StickyMenuContainer>
          <Menu />
        </StickyMenuContainer>
      </OuterAppContainer>
    );
  }
};

const DataContainer = styled("div")`
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
