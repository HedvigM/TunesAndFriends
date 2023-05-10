import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Box, styled } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { Menu } from "components/Menu";
import { Header } from "components/Header";
import { Login } from "components/Login";
import { TableData, StyledTable } from "components/Table";
import { getUser } from "services/local";
import { getMyCache } from "services/functions";
import { TUNE_URL } from "utils/urls";
import {
  ContentContainer,
  LogoContainer,
  OuterAppContainer,
  StickyMenuContainer,
} from "styles/layout";
import { useQuery } from "react-query";

const IndexPage: NextPage<{}> = ({}) => {
  const { user } = useUser();
  const [tuneIds, setTuneIds] = useState<number[]>([]);
  const [tuneNames, setTuneNames] = useState<TableData[]>([]);
  const [friends, setFriends] = useState<TableData[]>([]);

  useQuery(["User", user?.sub], async () => {
    const data = await getUser(user.sub);
    if (data && data.success) {
      setTuneIds(
        data.data.knowTunes.map((tunes) => tunes.sessionId).slice(0, 3)
      );
      setFriends(
        data.data.following.flatMap((friends) => {
          return { name: friends.name, id: friends.auth0UserId };
        })
      );
      return data;
    }
  });

  useQuery(
    ["tuneNames", tuneIds],
    () =>
      Promise.all(
        tuneIds.map((tunes) =>
          getMyCache(TUNE_URL(tunes)).then((response) => {
            return response;
          })
        )
      ).then((values) => {
        setTuneNames(values?.map((tune) => ({ name: tune.name, id: tune.id })));
      }),

    {
      enabled: !!tuneIds,
    }
  );

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
          <Header color="yellow" textAlign="left" size="small">
            T&F
          </Header>
        </LogoContainer>
        <ContentContainer>
          <Header color="yellow" size={"large"} textAlign="center">
            Tunes & Friends
          </Header>

          <TableContent>
            <Header color="blue" size={"small"} textAlign="center">
              Newest Friends
            </Header>
            <div>
              {friends &&
                friends.map((data) => (
                  <DataContainer key={data.id}>
                    <StyledTable
                      onClickHandle={() => {}}
                      know={true}
                      pathname={"/friend/[slug]"}
                      slug={data.id}
                      data={data}
                    />
                  </DataContainer>
                ))}
            </div>
          </TableContent>

          <TableContent>
            <Header color="blue" size={"small"} textAlign="center">
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
          </TableContent>
          <TableContent>
            <Header color="blue" size={"small"} textAlign="center">
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
          </TableContent>
        </ContentContainer>
        <StickyMenuContainer>
          <Menu />
        </StickyMenuContainer>
      </OuterAppContainer>
    );
  }
};

const TableContent = styled("div")`
  padding-top: 30px;
`;
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
