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

async function FriendProfile({ userId }: { userId: number }) {
  const [{ user }, friend] = await Promise.all([
    requireAuthWithUser(),
    userService.getUserById(userId),
  ]);

  if (!friend.success || !friend.data) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>User not found. Please try again later.</p>
      </div>
    );
  }

  const friendData = friend.data as UserWithRelations;

  const mapFollowing = user.following?.map(
    (followedUser) => followedUser.id
  ) || [];
  
  const friendsTuneIds = user.userTunes?.map(
    (userTune) => userTune.tune.sessionId
  ) || [];

  const uncachedSessionIds = (friendData.userTunes || [])
    .filter((ut) => !ut.tune.name)
    .map((ut) => ut.tune.sessionId);

  const externalTunes = uncachedSessionIds.length > 0
    ? await getTunesBasicInfo(uncachedSessionIds)
    : [];
  const externalTuneMap = new Map(externalTunes.map((t) => [t.id, t.name]));

  const userTunesList: TableData[] = (friendData.userTunes || [])
    .map((ut) => ({
      id: ut.tune.sessionId,
      name: ut.tune.name || externalTuneMap.get(ut.tune.sessionId) || null,
    }))
    .filter((t): t is TableData => t.name !== null);

  const tuneCount = friendData.userTunes?.length || 0;
  const followersCount = friendData.followedBy?.length || 0;
  const followingCount = friendData.following?.length || 0;

  return (
    <FriendClient
      userId={userId}
      friendData={friendData}
      tuneCount={tuneCount}
      followingCount={followingCount}
      followersCount={followersCount}
      userTunes={userTunesList}
      friendsTuneIds={friendsTuneIds}
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

