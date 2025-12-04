import { requireAuth } from "lib/auth/app-router";
import { userService } from "services";
import { POPULAR_URL } from "utils/urls";
import { Page } from "styles/Page";
import { PopularTunesClient } from "components/PopularTunesClient";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { LoadingSpinner } from "components/LoadingSpinner";
import styles from "styles/containers.module.scss";

type PopularTunesResponse = {
  tunes: Array<{
    id: number;
    name: string;
    url: string;
    member: {
      id: number;
      name: string;
      url: string;
    };
    date: string;
    type: string;
    tunebooks: number;
  }>;
  pagination: {
    page: number;
    per_page: number;
    pages: number;
    total: number;
  };
};

async function fetchPopularTunes(page: number = 1): Promise<PopularTunesResponse | null> {
  try {
    const response = await fetch(POPULAR_URL(page), {
      cache: "no-store", // TODO: Can be optimized with revalidation later
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch popular tunes: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching popular tunes:", error);
    return null;
  }
}

interface TunesPageProps {
  searchParams: { page?: string };
}

export default async function TunesPage({ searchParams }: TunesPageProps) {
  const session = await requireAuth();
  const auth0UserId = session.user.sub;

  // Get page number from searchParams
  const page = parseInt(searchParams.page || "1", 10);

  // Fetch user's known tunes
  const userResult = await userService.getUserByAuth0Id(auth0UserId);

  let knownTuneIds: number[] = [];
  if (userResult.success && userResult.data) {
    knownTuneIds =
      userResult.data.knowTunes?.map(
        (tune: { sessionId: number }) => tune.sessionId
      ) || [];
  }

  // Fetch popular tunes from external API
  const popularTunesData = await fetchPopularTunes(page);

  if (!popularTunesData || !popularTunesData.tunes) {
    return (
      <Page title="Popular Tunes">
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Failed to load popular tunes. Please try again later.</p>
        </div>
      </Page>
    );
  }

  return (
    <Page title="Popular Tunes">
      <ComponentErrorBoundary componentName="Popular Tunes List">
        <PopularTunesClient
          popularTunes={popularTunesData.tunes}
          knownTuneIds={knownTuneIds}
        />
      </ComponentErrorBoundary>

      <div className={styles.centerContainer}>
        {/* TODO: Add pagination component */}
        {/* Pagination can be added here using searchParams for page navigation */}
      </div>
    </Page>
  );
}

