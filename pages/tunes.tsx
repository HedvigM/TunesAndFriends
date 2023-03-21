import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import { StyledTable } from "../components/Table";
import { POPULAR_URL } from "utils/urls";
import Link from "next/link";
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { addTune, getUser } from "services/local";
import { NextPage } from "next";
import { getMyCache } from "services/functions";
import { styled } from "@mui/material";
import { Menu } from "components/Menu";
import { Header } from "components/Header";
import { LoadingSpinner } from "components/LoadingSpinner";

const Tunes: NextPage<{}> = () => {
  const [popularList, setPopularList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapKnow, setMapKnow] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const page = parseInt((router.query.page as string) || "1", 10);

  useEffect(() => {
    setLoading(true);
    const fetchUserWithId = async () => {
      if (user) {
        const newUserWithId = await getUser(user?.sub as string);
        if (newUserWithId.success) {
          let newKnowTunes = await newUserWithId.data?.knowTunes?.map(
            (tunes: { sessionId: number }) => tunes.sessionId
          );
          setMapKnow(newKnowTunes);
        }
        setLoading(false);
      }
    };

    fetchUserWithId();
  }, [user]);

  useEffect(() => {
    const getPopularTunes = async () => {
      const data = await getMyCache(POPULAR_URL(page));
      setPopularList(data.tunes);
      setLoading(false);
    };

    getPopularTunes();
  }, [page]);

  const onKnowHandle = (tuneId: number) => {
    let newMapKnow = mapKnow.slice();
    newMapKnow.push(tuneId);
    setMapKnow(newMapKnow);
    addTune(tuneId, user.email, "know");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Container sx={{}}>
          <Header size="large">popular tunes</Header>
          <div style={{ marginTop: "20px" }}>
            {!popularList && <LoadingSpinner />}
            {popularList.map((tune) => (
              <StyledTable
                data={tune}
                onClickHandle={onKnowHandle}
                know={mapKnow.includes(tune.id)}
                pathname="/tune/[slug]"
                slug={tune.id}
              />
            ))}
          </div>

          <Box
            sx={{
              paddingTop: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={10}
                page={page}
                color="primary"
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
        </Container>
        <Menu />
      </Box>
    </>
  );
};

export default withPageAuthRequired<WithPageAuthRequiredProps>(Tunes);
