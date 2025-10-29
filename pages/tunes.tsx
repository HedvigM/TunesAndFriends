import React, { useEffect, useState } from "react";
import { Box, Pagination, PaginationItem, Stack, styled } from "@mui/material";
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
import { Menu } from "components/Menu";
import { Header } from "components/Header";
import {
  ContentContainer,
  LogoContainer,
  OuterAppContainer,
  StickyMenuContainer,
} from "styles/layout";
import { LoadingSkeleton } from "components/loading";
import { PageErrorBoundary } from "components/errors/PageErrorBoundary";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";

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

const Tunes: NextPage<{}> = () => {
  const [popularList, setPopularList] = useState<PopularTunesTypes[]>([]);
  const [mapKnow, setMapKnow] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  /* console.log({ mapKnow }); */
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
    <PageErrorBoundary>
      <OuterAppContainer>
        <LogoContainer>
          <Header textAlign="left" size="small" color="blue">
            T&F
          </Header>
        </LogoContainer>
        <StyledContentContainer>
          <Header textAlign="center" size="large" color="blue">
            popular tunes
          </Header>

          <ComponentErrorBoundary componentName="Popular Tunes List">
            {loading ? (
              <LoadingSkeleton variant="list" />
            ) : (
              <TableContainer>
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
              </TableContainer>
            )}
          </ComponentErrorBoundary>

          <Box
            sx={{
              padding: "25px 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2}>
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
            </Stack>
          </Box>
        </StyledContentContainer>
        <StickyMenuContainer>
          <Menu />
        </StickyMenuContainer>
      </OuterAppContainer>
    </PageErrorBoundary>
  );
};

const StyledContentContainer = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TableContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export default withPageAuthRequired<WithPageAuthRequiredProps>(Tunes);
