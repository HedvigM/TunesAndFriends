import { ComponentErrorBoundary } from "components/errors";
import { MyProfileClient } from "components/MyProfileClient";
import { requireAuthWithUser } from "lib/auth/app-router";
import { Page } from "styles/Page";

export default async function ProfilePage() {
  const { user: databaseUser } = await requireAuthWithUser();

  return (
    <Page title="My Profile">
      <ComponentErrorBoundary componentName="My Profile">
        <MyProfileClient databaseUser={databaseUser} />
      </ComponentErrorBoundary>
    </Page>
  );
}
  