import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Box, styled } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { Header } from "components/Header";
import { Login } from "components/Login";
import { TableData, StyledTable } from "components/Table";
import { getUserByAuth0Id } from "lib/api";
import { getMyCache } from "services/functions";
import { TUNE_URL } from "utils/urls";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { Page } from "styles/Page";

const IndexPage: NextPage<{}> = ({}) => {
  const { user } = useUser();
  const [tuneIds, setTuneIds] = useState<number[]>();
  const [tuneNames, setTuneNames] = useState<TableData[]>();
  const [friends, setFriends] = useState<TableData[]>();

  useEffect(() => {
    const fetchUserWithId = async () => {
      if (user) {
        const result = await getUserByAuth0Id(user?.sub as string);
        if (result.success) {
          const userData = result.data;

          // Safely extract tune IDs
          const newTunes = userData?.knowTunes?.map(
            (tunes: { sessionId: number }) => tunes.sessionId
          ) || [];

          // Safely extract friends
          const friendsList = userData?.following?.flatMap((friend: { name: string; id: number }) => {
            return { name: friend.name, id: friend.id };
          }) || [];

          setFriends(friendsList);
          setTuneIds(newTunes.slice(0, 3));
        } else {
          console.error("Failed to fetch user:", result.error);
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
      <Page title="Tunes & Friends">
{/* Kolla in knapparna i den här tabellen. */}
            <ComponentErrorBoundary componentName="Newest Friends">
              <TableContent>
                <Header size={"small"} textAlign="center">
                  Newest Friends
                </Header>
                <div>
                  {friends &&
                    friends.map((data) => (
                      <DataContainer key={data.id}>
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
              </TableContent>
            </ComponentErrorBoundary>

            <ComponentErrorBoundary componentName="Newest Tunes">
              <TableContent>
                <Header size={"small"} textAlign="center">
                  Newest Tunes
                </Header>
                <div>
                  {tuneNames &&
                    tuneNames.map((tune) => (
                      <DataContainer key={tune.id}>
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
            </ComponentErrorBoundary>

            <ComponentErrorBoundary componentName="Friends Newest Tunes">
              <TableContent>
                <Header size={"small"} textAlign="center">
                  Friends newest tunes
                </Header>
                <div>
                  {Data.map((data) => (
                    <DataContainer key={data.id}>
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
            </ComponentErrorBoundary>
      </Page>
    );
  }
  return null;
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

export default IndexPage;
