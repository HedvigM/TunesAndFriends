import { requireAuthWithUser } from "lib/auth/app-router";
import { TUNE_URL } from "utils/urls";
import { Header } from "components/Header";
import { TableData, StyledTable } from "components/Table";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { Page } from "styles/Page";
import styles from "styles/containers.module.scss";

// Fetch tune data from external API
async function fetchTuneData(sessionId: number) {
  try {
    const response = await fetch(TUNE_URL(sessionId), {
      cache: "no-store", // Don't cache for now, can be optimized later
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch tune: ${response.statusText}`);
    }
    const data = await response.json();
    return { name: data.name, id: sessionId };
  } catch (error) {
    console.error(`Error fetching tune ${sessionId}:`, error);
    return null;
  }
}

export default async function HomePage() {
  const { user: userData } = await requireAuthWithUser();

  const tuneIds = userData?.knowTunes?.map(
    (tunes: { sessionId: number }) => tunes.sessionId
  ) || [];

  const friends: TableData[] = userData?.following?.flatMap(
    (friend: { name: string; id: number }) => ({
      name: friend.name,
      id: friend.id,
    })
  ) || [];

  const tuneIdsToFetch = tuneIds.slice(0, 3);
  const tuneNamesResults = await Promise.all(
    tuneIdsToFetch.map((id: number) => fetchTuneData(id))
  );
  const tuneNames: TableData[] = tuneNamesResults.filter(
    (tune): tune is TableData => tune !== null
  );

  const Data: TableData[] = [
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

  return (
    <Page title="Tunes & Friends">
      <div className={styles.flexGap}>
        <ComponentErrorBoundary componentName="Newest Friends">
          <Header size={"small"} textAlign="center">
            Newest Friends
          </Header>
          <div>
            {friends &&
              friends.map((data) => (
                <div 
                  key={data.id}
                  style={{
                    paddingTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <StyledTable
                    know={true}
                    pathname={"/friend"}
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
                <div 
                  key={tune.id}
                  style={{
                    paddingTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <StyledTable
                    know={true}
                    pathname={"/tune"}
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
              <div 
                key={data.id}
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <StyledTable
                  know={false}
                  pathname={"/tune"}
                  data={data}
                  slug={""}
                />
              </div>
            ))}
          </div>
        </ComponentErrorBoundary>
      </div>

    </Page>
  );
}

