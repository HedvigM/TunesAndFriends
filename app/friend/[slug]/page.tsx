import { Suspense } from "react";
import { requireAuthWithUser } from "lib/auth/app-router";
import { userService } from "services";
import { getTunesBasicInfo } from "services/externalTuneService";
import { Page } from "styles/Page";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { FriendClient } from "components/FriendClient";
import { FriendProfileSkeleton } from "components/skeletons";

type UserWithRelations = {
  id: number;
  name: string;
  email: string;
  auth0UserId: string;
  town: string | null;
  createdAt: Date;
  role: string;
  picture: string | null;
  profileText: string | null;
  userTunes: {
    id: number;
    tune: {
      id: number;
      sessionId: number;
      name: string | null;
      type: string | null;
      tags: { id: number; name: string }[];
    };
    tag: { id: number; name: string } | null;
  }[];
  following: { id: number; name: string; email: string; auth0UserId: string; town: string | null; picture: string | null }[];
  followedBy: { id: number; name: string; email: string; auth0UserId: string; town: string | null; picture: string | null }[];
};

type TableData = {
  name: string;
  id: number;
};

interface FriendPageProps {
  params: Promise<{ slug: string }>;
}

// Async component that fetches friend data
async function FriendProfile({ userId }: { userId: number }) {
  // Parallel fetch: auth and user lookup don't depend on each other
  const [{ user: loggedInUser }, viewedUserResult] = await Promise.all([
    requireAuthWithUser(),
    userService.getUserById(userId),
  ]);

  if (!viewedUserResult.success || !viewedUserResult.data) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>User not found. Please try again later.</p>
      </div>
    );
  }

  const viewedUser = viewedUserResult.data as UserWithRelations;

  const mapFollowing = loggedInUser.following?.map(
    (followedUser) => followedUser.id
  ) || [];
  
  const loggedinKnowTuneId = loggedInUser.userTunes?.map(
    (userTune) => userTune.tune.sessionId
  ) || [];

  // Find tunes without cached names
  const uncachedSessionIds = (viewedUser.userTunes || [])
    .filter((ut) => !ut.tune.name)
    .map((ut) => ut.tune.sessionId);

  // Only fetch from external API for uncached tunes
  const externalTunes = uncachedSessionIds.length > 0
    ? await getTunesBasicInfo(uncachedSessionIds)
    : [];
  const externalTuneMap = new Map(externalTunes.map((t) => [t.id, t.name]));

  // Build tune list using cached names or fallback to external
  const userTunesList: TableData[] = (viewedUser.userTunes || [])
    .map((ut) => ({
      id: ut.tune.sessionId,
      name: ut.tune.name || externalTuneMap.get(ut.tune.sessionId) || null,
    }))
    .filter((t): t is TableData => t.name !== null);

  const tuneCount = viewedUser.userTunes?.length || 0;
  const followersCount = viewedUser.followedBy?.length || 0;
  const followingCount = viewedUser.following?.length || 0;

  return (
    <FriendClient
      userId={userId}
      viewedUser={viewedUser}
      tuneCount={tuneCount}
      followingCount={followingCount}
      followersCount={followersCount}
      friendPicture={viewedUser.picture ?? ""}
      userTunes={userTunesList}
      loggedinKnowTuneId={loggedinKnowTuneId}
      mapFollowing={mapFollowing}
    />
  );
}

export default async function FriendPage({ params }: FriendPageProps) {
  const { slug } = await params;
  const userId = parseInt(slug, 10);

  if (isNaN(userId)) {
    return (
      <Page title="Friend Profile">
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Invalid user ID. Please try again.</p>
        </div>
      </Page>
    );
  }

  return (
    <Page title="Friend Profile">
      <ComponentErrorBoundary componentName="Friend Profile">
        <Suspense fallback={<FriendProfileSkeleton />}>
          <FriendProfile userId={userId} />
        </Suspense>
      </ComponentErrorBoundary>
    </Page>
  );
}

