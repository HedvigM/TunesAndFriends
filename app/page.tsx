import { getAuthSession, requireAuthWithUser } from "lib/auth/app-router";
import { getTunesBasicInfo } from "services/externalTuneService";

// Force dynamic rendering since this page uses cookies for auth
export const dynamic = 'force-dynamic';
import { Header } from "components/Header";
import { TableData, StyledTable } from "components/Table";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { Login } from "components/Login";
import { Page } from "styles/Page";
import styles from "styles/containers.module.scss";

type UserTuneData = {
  tune: {
    sessionId: number;
    name: string | null;
  };
};

export default async function HomePage() {
  const session = await getAuthSession();

  if (!session) {
    return <Login />;
  }

  const { user: userData } = await requireAuthWithUser();

  const userTunes = (userData?.userTunes || []) as UserTuneData[];

  const friends: TableData[] = userData?.following?.flatMap(
    (friend: { name: string; id: number }) => ({
      name: friend.name,
      id: friend.id,
    })
  ) || [];

  // Get the 3 most recent tunes
  const recentTunes = userTunes.slice(0, 3);
  
  // Find tunes without cached names
  const uncachedSessionIds = recentTunes
    .filter((ut) => !ut.tune.name)
    .map((ut) => ut.tune.sessionId);

  // Only fetch from external API for uncached tunes
  const externalTunes = uncachedSessionIds.length > 0
    ? await getTunesBasicInfo(uncachedSessionIds)
    : [];
  const externalTuneMap = new Map(externalTunes.map((t) => [t.id, t.name]));

  // Build tune list using cached names or fallback to external
  const tuneNames: TableData[] = recentTunes
    .map((ut) => ({
      id: ut.tune.sessionId,
      name: ut.tune.name || externalTuneMap.get(ut.tune.sessionId) || "Unknown",
    }))
    .filter((t) => t.name !== "Unknown");

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

