import { getUserIdOrNull } from "lib/auth/data-fetching";
import { userService } from "services/userService";
import { TUNE_URL } from "utils/urls";
import { Header } from "components/Header";
import { Login } from "components/Login";
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
  // Check if user is authenticated (optional auth for home page)
  const userId = await getUserIdOrNull();
  
  console.log("HomePage - userId:", userId);

  // If not authenticated, show login
  if (!userId) {
    console.log("HomePage - No userId, showing login");
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Login />
      </div>
    );
  }

  // Fetch user data directly from service layer (Server Component)
  console.log("HomePage - Fetching user data for:", userId);
  const userResult = await userService.getUserByAuth0Id(userId);
  
  console.log("HomePage - User result success:", userResult.success);
  if (!userResult.success) {
    console.log("HomePage - User fetch failed:", userResult.error);
  }
  
  if (!userResult.success || !userResult.data) {
    console.log("HomePage - User fetch failed or no data, showing login");
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Login />
      </div>
    );
  }
  
  console.log("HomePage - User data fetched successfully, rendering page");

  const userData = userResult.data;

  // Extract tune IDs and friends
  const tuneIds = userData?.knowTunes?.map(
    (tunes: { sessionId: number }) => tunes.sessionId
  ) || [];

  const friends: TableData[] = userData?.following?.flatMap(
    (friend: { name: string; id: number }) => ({
      name: friend.name,
      id: friend.id,
    })
  ) || [];

  // Fetch tune names (limit to first 3)
  const tuneIdsToFetch = tuneIds.slice(0, 3);
  const tuneNamesResults = await Promise.all(
    tuneIdsToFetch.map((id: number) => fetchTuneData(id))
  );
  const tuneNames: TableData[] = tuneNamesResults.filter(
    (tune): tune is TableData => tune !== null
  );

  // Mock data for "Friends newest tunes" section
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
                  pathname={""}
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

