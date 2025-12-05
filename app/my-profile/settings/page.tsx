import { requireAuthWithUser } from "lib/auth/app-router";
import { Page } from "styles/Page";
import { ProfileClient } from "components/SettingsClient";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";

export default async function ProfilePage() {
  const { session, user: databaseUser } = await requireAuthWithUser();
  const userPicture = session.user.picture;

  return (
    <Page title="Settings">
      <ComponentErrorBoundary componentName="Settings">
        <ProfileClient databaseUser={databaseUser} userPicture={userPicture} />
      </ComponentErrorBoundary>
    </Page>
  );
}

