import { requireAuth } from "lib/auth/app-router";
import { userService } from "services";
import { TUNE_URL } from "utils/urls";
import { Page } from "styles/Page";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { FriendClient } from "components/FriendClient";
import { Prisma } from "@prisma/client";

type UserWithRelations = Prisma.UserGetPayload<{
  include: { following: true; followedBy: true; knowTunes: true };
}>;

type TableData = {
  name: string;
  id: number;
};

async function fetchTuneData(sessionId: number): Promise<TableData | null> {
  try {
    const response = await fetch(TUNE_URL(sessionId), {
      cache: "no-store", // Don't cache for now, can be optimized later
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch tune: ${response.statusText}`);
    }
    const data = await response.json();
    return { name: data.name, id: sessionId };
  } catch (error) {
    console.error(`Error fetching tune ${sessionId}:`, error);
    return null;
  }
}

interface FriendPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FriendPage({ params }: FriendPageProps) {
  const { slug } = await params;
  
  // Require authentication
  const session = await requireAuth();
  const currentUserAuth0Id = session.user.sub;


  // Parse slug as numeric ID (from FriendsClient, slug is friend.id.toString())
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

  // Fetch the viewed user (friend) by numeric ID
  const viewedUserResult = await userService.getUserById(userId);

  if (!viewedUserResult.success || !viewedUserResult.data) {
    console.error("Failed to fetch viewed user:", viewedUserResult.error);
    return (
      <Page title="Friend Profile">
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>User not found. Please try again later.</p>
        </div>
      </Page>
    );
  }

  const viewedUser = viewedUserResult.data as UserWithRelations;

  // Fetch the logged-in user (for comparison and following status)
  let mapFollowing: number[] = [];
  let loggedinKnowTuneId: number[] = [];

  const loggedInUserResult = await userService.getUserByAuth0Id(currentUserAuth0Id);
  if (loggedInUserResult.success && loggedInUserResult.data) {
    const loggedInUser = loggedInUserResult.data as UserWithRelations;
    
    // Extract following IDs
    if (Array.isArray(loggedInUser.following)) {
      mapFollowing = loggedInUser.following.map(
        (followedUser: { id: number }) => followedUser.id
      );
    }
    
    // Extract known tune IDs
    if (Array.isArray(loggedInUser.knowTunes)) {
      loggedinKnowTuneId = loggedInUser.knowTunes.map(
        (tune: { sessionId: number }) => tune.sessionId
      );
    }
  }

  // Fetch tune data for viewed user's knowTunes
  const knowTunes: TableData[] = [];
  if (Array.isArray(viewedUser.knowTunes) && viewedUser.knowTunes.length > 0) {
    const tuneDataResults = await Promise.all(
      viewedUser.knowTunes.map((tune: { sessionId: number }) =>
        fetchTuneData(tune.sessionId)
      )
    );
    
    const validTunes = tuneDataResults.filter(
      (tune): tune is TableData => tune !== null
    );
    knowTunes.push(...validTunes);
  }

  const tuneCount = viewedUser.knowTunes?.length || 0;
  const followersCount = viewedUser.followedBy?.length || 0;
  const followingCount = viewedUser.following?.length || 0;

  return (
    <Page title={viewedUser.name || "Friend Profile"}>
      <ComponentErrorBoundary componentName="Friend Profile">
        <FriendClient
          viewedUser={viewedUser}
          tuneCount={tuneCount}
          followingCount={followingCount}
          followersCount={followersCount}
          friendPicture={viewedUser.picture ?? ""}
          knowTunes={knowTunes}
          loggedinKnowTuneId={loggedinKnowTuneId}
          mapFollowing={mapFollowing}
        />
      </ComponentErrorBoundary>
    </Page>
  );
}

