import { useEffect, useState } from "react";
import { StyledTable } from "../components/Table";
import { POPULAR_URL } from "utils/urls";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { addTune, getUser } from "services/local";
import { NextPage } from "next";
import { getMyCache } from "services/functions";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { Page } from "styles/Page";
import styles from "styles/containers.module.scss";
import { LoadingSpinner } from "components/LoadingSpinner";

type PopularTunesTypes = {
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
};
/* TODO: Replace pagination with custom pagination component. */
const Tunes: NextPage<{}> = () => {
  const [popularList, setPopularList] = useState<PopularTunesTypes[]>([]);
  const [mapKnow, setMapKnow] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const page = parseInt((router.query.page as string) || "1", 10);

  useEffect(() => {
    let isMounted = true;

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
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    const getPopularTunes = async () => {
      try {
        const data = await getMyCache(POPULAR_URL(page));
        if (isMounted) {
          setPopularList(data.tunes);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching popular tunes:", error);
          setLoading(false);
        }
      }
    };

    getPopularTunes();

    return () => {
      isMounted = false;
    };
  }, [page]);

  const onKnowHandle = (tuneId: number) => {
    if (!user || !user.email) return;
    setMapKnow(prev => [...prev, tuneId]);
    addTune(tuneId, user.email, "know");
  };

  return (
    <Page title="popular tunes">
      <ComponentErrorBoundary componentName="Popular Tunes List">
            {loading ? (
              <LoadingSpinner size="large" />
            ) : (
              <div className={styles.tableContainer}>
                {popularList.map((tune) => (
                  <StyledTable
                    key={tune.id}
                    data={tune}
                    onClickHandle={onKnowHandle}
                    know={mapKnow !== undefined && mapKnow.includes(tune.id)}
                    pathname="/tune/[slug]"
                    slug={tune.id}
                  />
                ))}
              </div>
            )}
          </ComponentErrorBoundary>

          <div className={styles.centerContainer}>
        {/*     <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={10}
                page={page}
                color="secondary"
                size="small"
                renderItem={(item) => (
                  <PaginationItem
                    component={"a"}
                    href={`/tunes${
                      item.page === 1 ? "" : `?page=${item.page}`
                    }`}
                    {...item}
                  />
                )}
              />
            </div> */}
          </div>
    </Page>
  );
};

export default withPageAuthRequired(Tunes);
