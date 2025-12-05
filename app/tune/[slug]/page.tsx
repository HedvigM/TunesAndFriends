import { requireAuth } from "lib/auth/app-router";
import { userService } from "services";
import { TUNE_URL } from "utils/urls";
import { Page } from "styles/Page";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { TuneClient } from "components/TuneClient";
import { User } from "lib/api";

interface TuneDetails {
  name: string;
  type: string;
  id: string;
  settings: Array<{ abc: string }>;
}

interface TunePageProps {
  params: Promise<{ slug: string }>;
}

/* TODO: move to a service */
async function fetchTuneDetails(sessionId: number): Promise<TuneDetails | null> {
  try {
    const response = await fetch(TUNE_URL(sessionId), {
      cache: "no-store", // Don't cache for now, can be optimized later
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch tune: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching tune ${sessionId}:`, error);
    return null;
  }
}

export default async function TunePage({ params }: TunePageProps) {
  const { slug } = await params;
  const session = await requireAuth();
  const currentUserAuth0Id = session.user.sub;
  const sessionId = parseInt(slug, 10);

  if (isNaN(sessionId)) {
    return (
      <Page title="Tune Details">
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Invalid tune ID. Please try again.</p>
        </div>
      </Page>
    );
  }

  const tuneDetails = await fetchTuneDetails(sessionId);

  if (!tuneDetails) {
    return (
      <Page title="Tune Details">
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Tune not found. Please try again later.</p>
        </div>
      </Page>
    );
  }

  const usersWithTuneResult = await userService.listUsersWithTune(sessionId);
  const usersTuneList: User[] = usersWithTuneResult.success && usersWithTuneResult.data
    ? usersWithTuneResult.data
    : [];

  let loggedinKnowTuneIds: number[] = [];
  const loggedInUserResult = await userService.getUserByAuth0Id(currentUserAuth0Id);
  if (loggedInUserResult.success && loggedInUserResult.data) {
    if (Array.isArray(loggedInUserResult.data.knowTunes)) {
      loggedinKnowTuneIds = loggedInUserResult.data.knowTunes.map(
        (tune: { sessionId: number }) => tune.sessionId
      );
    }
  }

  const abcNotes = tuneDetails.settings?.[0]?.abc || "";
  const isKnown = loggedinKnowTuneIds.includes(sessionId);

  return (
    <Page title={tuneDetails.name || "Tune Details"}>
      <ComponentErrorBoundary componentName="Tune Details">
        <TuneClient
          tuneName={tuneDetails.name}
          tuneType={tuneDetails.type}
          tuneId={tuneDetails.id}
          sessionId={sessionId}
          abcNotes={abcNotes}
          usersTuneList={usersTuneList}
          isKnown={isKnown}
        />
      </ComponentErrorBoundary>
    </Page>
  );
}

