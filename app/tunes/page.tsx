import { Suspense } from "react";
import { requireAuthWithUser } from "lib/auth/app-router";
import { getPopularTunes } from "services/externalTuneService";

// Force dynamic rendering since this page uses cookies for auth
export const dynamic = 'force-dynamic';
import { Page } from "styles/Page";
import { PopularTunesClient } from "components/PopularTunesClient";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { PopularTunesSkeleton } from "components/skeletons";
import { Pagination } from "components/Pagination";

interface TunesPageProps {
  searchParams: Promise<{ page?: string }>;
}

// Async component that fetches popular tunes and returns pagination info
async function PopularTunesWithPagination({ page }: { page: number }) {
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

  // TheSession.org API returns pagination at root level
  const currentPage = popularTunesData.page || page;
  const totalPages = popularTunesData.pages || 1;

  return (
    <>
      <PopularTunesClient
        userId={userData.id}
        popularTunes={popularTunesData.tunes}
        knownTuneIds={knownTuneIds}
      />
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/tunes"
        />
      )}
    </>
  );
}

export default async function TunesPage({ searchParams }: TunesPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1", 10);

  return (
    <Page title="Popular Tunes">
      <ComponentErrorBoundary componentName="Popular Tunes List">
        <Suspense fallback={<PopularTunesSkeleton count={10} />}>
          <PopularTunesWithPagination page={page} />
        </Suspense>
      </ComponentErrorBoundary>
    </Page>
  );
}

