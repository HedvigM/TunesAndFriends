import { Suspense } from "react";
import { requireAuthWithUser } from "lib/auth/app-router";
import { userService } from "services";
import { getTuneDetails } from "services/externalTuneService";
import { Page } from "styles/Page";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { TuneClient } from "components/TuneClient";
import { TuneDetailSkeleton } from "components/skeletons";
import { User } from "lib/api";

interface TunePageProps {
  params: Promise<{ slug: string }>;
}

// Async component that fetches tune data
async function TuneDetail({ sessionId }: { sessionId: number }) {
  // Parallel fetch: all three don't depend on each other
  const [{ user }, tuneDetails, usersWithTuneResult] = await Promise.all([
    requireAuthWithUser(),
    getTuneDetails(sessionId),
    userService.listUsersWithTune(sessionId),
  ]);

  if (!tuneDetails) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Tune not found. Please try again later.</p>
      </div>
    );
  }

  const usersTuneList: User[] = usersWithTuneResult.success && usersWithTuneResult.data
    ? usersWithTuneResult.data
    : [];

  // Get logged-in user's known tune IDs
  const usersTuneIds = user.userTunes?.map(
    (userTune) => userTune.tune.sessionId
  ) || [];

  const abcNotes = tuneDetails.settings?.[0]?.abc || "";
  const isKnown = usersTuneIds.includes(sessionId);

  return (
    <TuneClient
      userId={user.id}
      tuneName={tuneDetails.name}
      tuneType={tuneDetails.type}
      tuneId={tuneDetails.id}
      sessionId={sessionId}
      abcNotes={abcNotes}
      usersTuneList={usersTuneList}
      isKnown={isKnown}
    />
  );
}

export default async function TunePage({ params }: TunePageProps) {
  const { slug } = await params;
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

  return (
    <Page title="Tune Details">
      <ComponentErrorBoundary componentName="Tune Details">
        <Suspense fallback={<TuneDetailSkeleton />}>
          <TuneDetail sessionId={sessionId} />
        </Suspense>
      </ComponentErrorBoundary>
    </Page>
  );
}

