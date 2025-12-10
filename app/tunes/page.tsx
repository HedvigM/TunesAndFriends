import { Suspense } from "react";
import { requireAuthWithUser } from "lib/auth/app-router";
import { getPopularTunes } from "services/externalTuneService";

// Force dynamic rendering since this page uses cookies for auth
export const dynamic = 'force-dynamic';
import { Page } from "styles/Page";
import { PopularTunesClient } from "components/PopularTunesClient";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { PopularTunesSkeleton } from "components/skeletons";
import styles from "styles/containers.module.scss";

interface TunesPageProps {
  searchParams: Promise<{ page?: string }>;
}

// Async component that fetches popular tunes
async function PopularTunesList({ page }: { page: number }) {
  // Parallel fetch: auth and popular tunes don't depend on each other
  const [{ user: userData }, popularTunesData] = await Promise.all([
    requireAuthWithUser(),
    getPopularTunes(page),
  ]);

  // Get user's known tune IDs
  const knownTuneIds = userData.userTunes?.map(
    (tune) => tune.tune.sessionId
  ) || [];

  if (!popularTunesData || !popularTunesData.tunes) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Failed to load popular tunes. Please try again later.</p>
      </div>
    );
  }

  return (
    <PopularTunesClient
      userId={userData.id}
      popularTunes={popularTunesData.tunes}
      knownTuneIds={knownTuneIds}
    />
  );
}

export default async function TunesPage({ searchParams }: TunesPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1", 10);

  return (
    <Page title="Popular Tunes">
      <ComponentErrorBoundary componentName="Popular Tunes List">
        <Suspense fallback={<PopularTunesSkeleton count={10} />}>
          <PopularTunesList page={page} />
        </Suspense>
      </ComponentErrorBoundary>

      <div className={styles.centerContainer}>
        {/* TODO: Add pagination component */}
      </div>
    </Page>
  );
}

