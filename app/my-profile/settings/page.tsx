import { requireAuth } from "lib/auth/app-router";
import { userService } from "services";
import { Page } from "styles/Page";
import { ProfileClient } from "components/SettingsClient";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";

export default async function ProfilePage() {
  const session = await requireAuth();
  const auth0UserId = session.user.sub;
  const userEmail = session.user.email;
  const userPicture = session.user.picture;

  if (!userEmail) {
    return (
      <Page title="Settings">
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>User not found. Please try again.</p>
        </div>
      </Page>
    );
  }

  const userResult = await userService.getUserByAuth0Id(auth0UserId);

  if (!userResult.success || !userResult.data) {
    console.error("Failed to fetch user data:", userResult.error);
    return (
      <Page title="Settings">
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Failed to load your profile. Please try again later.</p>
        </div>
      </Page>
    );
  }

  const databaseUser = userResult.data;

  return (
    <Page title="Settings">
      <ComponentErrorBoundary componentName="Settings">
        <ProfileClient databaseUser={databaseUser} userPicture={userPicture} />
      </ComponentErrorBoundary>
    </Page>
  );
}

