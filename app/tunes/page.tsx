import { Suspense } from "react";
import { requireAuthWithUser } from "lib/auth/app-router";
import { getPopularTunes } from "services/externalTuneService";

// Force dynamic rendering since this page uses cookies for auth
export const dynamic = 'force-dynamic';
import { Page } from "styles/Page";
import { TunesPageClient } from "components/TunesPageClient";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { PopularTunesSkeleton } from "components/skeletons";

interface TunesPageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

// Async component that fetches data and renders the client component
async function TunesContent({ page }: { page: number }) {
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
    <TunesPageClient
      userId={userData.id}
      knownTuneIds={knownTuneIds}
      popularTunes={popularTunesData.tunes}
      popularCurrentPage={currentPage}
      popularTotalPages={totalPages}
    />
  );
}

export default async function TunesPage({ searchParams }: TunesPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1", 10);

  // Dynamic title based on search
  const searchQuery = resolvedSearchParams.q;
  const pageTitle = searchQuery ? `Search: ${searchQuery}` : "Tunes";

  return (
    <Page title={pageTitle}>
      <ComponentErrorBoundary componentName="Tunes">
        <Suspense fallback={<PopularTunesSkeleton count={10} />}>
          <TunesContent page={page} />
        </Suspense>
      </ComponentErrorBoundary>
    </Page>
  );
}

