import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Header } from "components/Header";
import { Login } from "components/Login";
import { TableData, StyledTable } from "components/Table";
import { getUserByAuth0Id } from "lib/api";
import { getMyCache } from "services/functions";
import { TUNE_URL } from "utils/urls";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { Page } from "styles/Page";
import styles from "styles/containers.module.scss";

const IndexPage: NextPage<{}> = ({}) => {
  const { user } = useUser();
  const [tuneIds, setTuneIds] = useState<number[]>();
  const [tuneNames, setTuneNames] = useState<TableData[]>();
  const [friends, setFriends] = useState<TableData[]>();

  useEffect(() => {
    let isMounted = true;

    const fetchUserWithId = async () => {
      if (user) {
        try {
          const result = await getUserByAuth0Id(user?.sub as string);
          if (isMounted && result.success) {
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
          } else if (isMounted && !result.success) {
            console.error("Failed to fetch user:", result.error);
          }
        } catch (error) {
          if (isMounted) {
            console.error("Error fetching user:", error);
          }
        }
      }
    };

    fetchUserWithId();

    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    if (tuneIds) {
      Promise.all(
        tuneIds.map((tunes) =>
          getMyCache(TUNE_URL(tunes)).then((response) => {
            return response;
          })
        )
      ).then((values) => {
        if (isMounted) {
          setTuneNames(values?.map((tune) => ({ name: tune.name, id: tune.id })));
        }
      }).catch((error) => {
        if (isMounted) {
          console.error("Error fetching tune names:", error);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [tuneIds]);

  if (!user) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Login />
      </div>
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
        <div className={styles.flexGap}>
            <ComponentErrorBoundary componentName="Newest Friends">
                <Header size={"small"} textAlign="center">
                  Newest Friends
                </Header>
                <div>
                  {friends &&
                    friends.map((data) => (
                      <div className="dataContainer" key={data.id}>
                        <StyledTable
                          onClickHandle={() => {}}
                          know={true}
                          pathname={""}
                          data={data}
                          slug={""}
                        />
                      </div>
                    ))}
                </div>
            </ComponentErrorBoundary>

            <ComponentErrorBoundary componentName="Newest Tunes">
                <Header size={"small"} textAlign="center">
                  Newest Tunes
                </Header>
                <div>
                  {tuneNames &&
                    tuneNames.map((tune) => (
                        <div className="dataContainer" key={tune.id}>
                        <StyledTable
                          onClickHandle={() => {}}
                          know={true}
                          pathname={"/tune/[slug]"}
                          data={tune}
                          slug={tune.id}
                        />
                      </div>
                    ))}
                </div>
            </ComponentErrorBoundary>

            <ComponentErrorBoundary componentName="Friends Newest Tunes">
                <Header size={"small"} textAlign="center">
                  Friends newest tunes
                </Header>
                <div>
                  {Data.map((data) => (
                    <div className="dataContainer" key={data.id}>
                      <StyledTable
                        onClickHandle={() => {}}
                        know={false}
                        pathname={""}
                        data={data}
                        slug={""}
                      />
                    </div>
                  ))}
                </div>
            </ComponentErrorBoundary>
        </div>

        <style jsx={true}>{`
          .dataContainer {
            padding-top: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}</style>
      </Page>
    );
  }
  return null;
};

export default IndexPage;
