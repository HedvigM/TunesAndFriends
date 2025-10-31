import React, { useEffect, useState } from "react";
import { StyledTable } from "../components/Table";
import { POPULAR_URL } from "utils/urls";
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from "@auth0/nextjs-auth0";
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
    const fetchUserWithId = async () => {
      if (user) {
        const newUserWithId = await getUser(user?.sub as string);
        if (newUserWithId.success) {
          let newKnowTunes = await newUserWithId.data?.knowTunes?.map(
            (tunes: { sessionId: number }) => tunes.sessionId
          );
          setMapKnow(newKnowTunes || [] as number[]);
        }
      }
    };

    fetchUserWithId();
  }, [user]);

  useEffect(() => {
    setLoading(true);
    const getPopularTunes = async () => {
      const data = await getMyCache(POPULAR_URL(page));
      setPopularList(data.tunes);
      setLoading(false);
    };

    getPopularTunes();
  }, [page]);

  const onKnowHandle = (tuneId: number) => {
    if (!user || !user.email) return;
    let newMapKnow = mapKnow.slice();
    newMapKnow.push(tuneId);
    setMapKnow(newMapKnow);
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

export default withPageAuthRequired<WithPageAuthRequiredProps>(Tunes);
