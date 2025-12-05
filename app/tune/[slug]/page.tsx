import { requireAuthWithUser } from "lib/auth/app-router";
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
      next: { revalidate: 3600 }, // Cache for 1 hour, then revalidate
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
  const { user: loggedInUser } = await requireAuthWithUser();
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

  // Get logged-in user's known tune IDs
  const loggedinKnowTuneIds = loggedInUser.knowTunes?.map(
    (tune) => tune.sessionId
  ) || [];

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

