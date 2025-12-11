import { Suspense } from "react";
import { requireAuthWithUser } from "lib/auth/app-router";
import { getTunesDetails } from "services/externalTuneService";

export const dynamic = 'force-dynamic';
import { Page } from "styles/Page";
import { MyTunesClient } from "components/MyTunesClient";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { TunesSkeleton } from "components/skeletons";

type UserTuneWithDetails = {
  id: number;
  tune: {
    id: number;
    sessionId: number;
    name: string | null;
    type: string | null;
  };
  tags: { id: number; name: string }[];
};

// Async component that fetches and renders tunes
async function MyTunesList() {
  const { user: userData } = await requireAuthWithUser();

  const userTunes = (userData?.userTunes || []) as UserTuneWithDetails[];

  if (userTunes.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>You don&apos;t have any tunes yet.</p>
      </div>
    );
  }

  // Find tunes that don't have cached names
  const uncachedSessionIds = userTunes
    .filter((ut) => !ut.tune.name)
    .map((ut) => ut.tune.sessionId);

  // Only fetch from external API for uncached tunes
  const externalTuneMap = uncachedSessionIds.length > 0
    ? await getTunesDetails(uncachedSessionIds)
    : new Map();

  // Build tune objects using cached names or fallback
  const tuneObjects = userTunes
    .map((userTune) => {
      const tuneName = userTune.tune.name 
        || externalTuneMap.get(userTune.tune.sessionId)?.name;
      
      if (!tuneName) return null;
      
      return {
        id: userTune.tune.id,
        sessionId: userTune.tune.sessionId,
        name: tuneName,
        tags: userTune.tags || [],
      };
    })
    .filter((tune): tune is NonNullable<typeof tune> => tune !== null);

  const allTags = tuneObjects.flatMap((tune) => tune.tags);
  const uniqueTags = allTags.filter(
    (tag, index, self) =>
      index === self.findIndex((filterTag) => filterTag.id === tag.id)
  );

  return (
    <MyTunesClient tuneObjects={tuneObjects} tags={uniqueTags} userId={userData.id} />
  );
}

export default function MyTunesPage() {
  return (
    <Page title="My tunes">
      <ComponentErrorBoundary componentName="My Tunes">
        <Suspense fallback={<TunesSkeleton count={8} />}>
          <MyTunesList />
        </Suspense>
      </ComponentErrorBoundary>
    </Page>
  );
}

