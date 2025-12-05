/* TODO: När man lägger till låtar (från nya tunes sidan... 
kanske även från gamla tunes sidan?) så verkar dom hamna lite fel. Ser ut som att låtar 
och taggar läggs på på fel användare och med taggar den inte ska ha? */
import { requireAuthWithUser } from "lib/auth/app-router";
import { TUNE_URL } from "utils/urls";
import { Page } from "styles/Page";
import { MyTunesClient } from "components/MyTunesClient";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";

type TuneWithTags = {
  id: number;
  sessionId: number;
  tags: { id: number; name: string }[];
};

async function fetchTuneData(sessionId: number) {
  try {
    const response = await fetch(TUNE_URL(sessionId), {
      cache: "no-store", /* TODO: Don't cache for now, can be optimized later */
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

export default async function MyTunesPage() {
  const { user: userData } = await requireAuthWithUser();

  const tunes = (userData?.knowTunes || []) as TuneWithTags[];

  if (tunes.length === 0) {
    return (
      <Page title="My tunes">
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>You don't have any tunes yet.</p>
        </div>
      </Page>
    );
  }

  const tuneObjectsResults = await Promise.all(
    tunes.map(async (tune: TuneWithTags) => {
      const tuneData = await fetchTuneData(tune.sessionId);
      if (!tuneData) {
        return null;
      }
      return {
        id: tune.id,
        sessionId: tune.sessionId,
        name: tuneData.name,
        tags: tune.tags || [],
      };
    })
  );

  const tuneObjects = tuneObjectsResults.filter(
    (tune): tune is NonNullable<typeof tune> => tune !== null
  );

  const allTags = tuneObjects.flatMap((tune) => tune.tags);
  const uniqueTags = allTags.filter(
    (tag, index, self) =>
      index === self.findIndex((filterTag) => filterTag.id === tag.id)
  );

  return (
    <Page title="My tunes">
      <ComponentErrorBoundary componentName="My Tunes">
        <MyTunesClient tuneObjects={tuneObjects} tags={uniqueTags} userId={userData.id} />
      </ComponentErrorBoundary>
    </Page>
  );
}

