import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TUNE_URL } from "utils/urls";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { NextPage } from "next";
import { getMyCache } from "services/functions";
import { Header } from "components/Header";
import { TuneInfo } from "components/TuneInfo";
import { addTune, getUser, listUsersWithTune } from "services/local";
import { User } from "lib/api";
import { TunePlayer } from "components/TunePlayer";
import { Button } from "styles/Button";
import { Page } from "styles/Page";




const detailedtune: NextPage<{}> = () => {
  const { user } = useUser();
  const [usersTuneList, setUsersTuneList] = useState<User[]>([]);
  const [_loading, setLoading] = useState(true);
  const [mapKnow, setMapKnow] = useState<number[]>([]);
  const [details, setDetails] = useState({
    name: "Loading...",
    type: "Loading...",
    id: "Loading",
  });
  const [abc, setAbc] = useState(
    "|:E2BE dEBE|E2BE AFDF|E2BE dEBE|BABc dAFD:|!d2fd c2ec|defg afge|d2fd c2ec|BABc dAFA|!d2fd c2ec|defg afge|afge fdec|BABc dAFD|"
  );
  /* console.log("abc: ", abc); */

  const getListOfTuneUsers = async (tuneId: number) => {
    const fetchedList = await listUsersWithTune(tuneId);
    if (fetchedList.success) {
      setUsersTuneList(fetchedList.data);
    }
  };

  type Slug = {
    slug: string;
  };

  const router = useRouter();
  const { slug } = router.query as unknown as Slug;
  const parsedSlug = parseInt(slug, 10);

  /* const abcjs = process.browser ? require("abcjs") : null; */

  useEffect(() => {
    let isMounted = true;

    if (parsedSlug) {
      getListOfTuneUsers(parsedSlug);
    }
    const fetchUserWithId = async () => {
      if (user) {
        try {
          const newUserWithId = await getUser(user?.sub as string);
          if (isMounted && newUserWithId.success) {
            let newKnowTunes = await newUserWithId.data?.knowTunes?.map(
              (tunes: { sessionId: number }) => tunes.sessionId
            );
            setMapKnow(newKnowTunes || [] as number[]);
          }
        } catch (error) {
          if (isMounted) {
            console.error("Error fetching user:", error);
          }
        }
      }
    };

    fetchUserWithId();

    return () => {
      isMounted = false;
    };
  }, [user, parsedSlug]);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    const getDetailedTune = async () => {
      try {
        const data = await getMyCache(TUNE_URL(slug));
        if (isMounted) {
          setDetails(data);
/* console.log("data: ", data.settings[0].abc); */
          setAbc(data.settings[0].abc);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching detailed tune:", error);
          setLoading(false);
        }
      }
    };
    getDetailedTune();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const onBackClickHandle = () => {
    router.back();
  };
  const onKnowHandle = () => {
    if (!user || !user.email) return;
    const tuneId = parseInt(details.id as string, 10);
    setMapKnow(prev => [...prev, tuneId]);
    addTune(details.id, user.email, "know");
  };

  return (
    <Page>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row-reverse",
          }}
        >
          <Header size="small" textAlign="center">
            {details.name}
          </Header>
          <Button
            color="var(--color-third)"
            active={false}
            element="button"
            onClick={onBackClickHandle}
            /* icon={<ArrowBackIosNewIcon />} */
          >{`<-- Back`}</Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "85%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <TunePlayer abcNotes={abc} />
          </div>
          <div style={{ width: "85%", display: "flex", flexDirection: "column", gap: "5px", alignItems: "start" }}>
            <Button
              active={mapKnow !== undefined && mapKnow.includes(parseInt(details.id as string, 10))}
              onClick={onKnowHandle}
              >
              Add
            </Button>
            <TuneInfo type={details.type} knownBy={usersTuneList} />
          </div>
        </div>
    </Page>
  );
};

export default withPageAuthRequired(detailedtune);
