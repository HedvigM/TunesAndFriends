import { requireAuth } from "lib/auth/app-router";
import { userService } from "services";
import { Page } from "styles/Page";
import { FriendsClient } from "components/FriendsClient";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";

export default async function FriendsPage() {
  const session = await requireAuth();
  const auth0UserId = session.user.sub;
  const userEmail = session.user.email;

  if (!userEmail) {
    return (
      <Page title="Friends">
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>User not found. Please try again.</p>
        </div>
      </Page>
    );
  }

  const currentUserResult = await userService.getUserByAuth0Id(auth0UserId);

  if (!currentUserResult.success || !currentUserResult.data) {
    console.error("Failed to fetch user data:", currentUserResult.error);
    return (
      <Page title="Friends">
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Failed to load your data. Please try again later.</p>
        </div>
      </Page>
    );
  }

  const currentUser = currentUserResult.data;
  const usersListResult = await userService.listUsers();

  if (!usersListResult.success || !usersListResult.data) {
    console.error("Failed to fetch users list:", usersListResult.error);
    return (
      <Page title="Friends">
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Failed to load users. Please try again later.</p>
        </div>
      </Page>
    );
  }

  const friendsArray = (currentUser.following || []).map(
    (friend: { auth0UserId: string }) => friend.auth0UserId
  );

  return (
    <Page title="Friends">
      <ComponentErrorBoundary componentName="Friends">
        <FriendsClient
          usersList={usersListResult.data}
          currentUserEmail={userEmail}
          friendsArray={friendsArray}
        />
      </ComponentErrorBoundary>
    </Page>
  );
}

