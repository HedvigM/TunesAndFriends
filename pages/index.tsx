import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Box } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { Menu } from "components/Menu";
import { Header } from "components/Header";
import { Login } from "components/Login";
import { Data, StyledTable } from "components/Table";
import { getUser } from "services/local";
import { getMyCache } from "services/functions";
import { TUNE_URL } from "utils/urls";

const IndexPage: NextPage<{}> = ({}) => {
  const { user } = useUser();
  const [tunes, setTunes] = useState({
    name: "Loading...",
    id: "Loading",
  });
  const [tuneNames, setTuneNames] = useState();
  const [friends, setFriends] = useState<Data>();

  console.log({ friends });
  console.log({ tunes });
  console.log({ tuneNames });
  useEffect(() => {
    const fetchUserWithId = async () => {
      if (user) {
        const newUserWithId = await getUser(user?.sub as string);
        if (newUserWithId.success) {
          let newTunes = await newUserWithId.data?.knowTunes?.map(
            (tunes: Data) => tunes.sessionId
          );

          setFriends(
            await newUserWithId.data?.following?.flatMap((friends: Data) => {
              return { name: friends.name, id: friends.id };
            })
          );
          setTunes(newTunes.slice(0, 3));
        }
      }
    };

    fetchUserWithId();
  }, [user]);

  // Hämta låtnamnen
  /*   useEffect(() => {
    const getDetailedTune = async () => {
      if (tunes) {
        const tuneMap = tunes.map((tune) => tune.id);
          const data = await getMyCache(TUNE_URL(tuneMap)); 
        setTuneNames(await getMyCache(TUNE_URL(tuneMap)));
      }
    };

    getDetailedTune();
  }, [tunes]);  */

  if (!user) {
    return (
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <Login />
        <Menu />
      </Box>
    );
  }

  const Data = [
    {
      name: "jorid",
      id: 0,
    },
    {
      name: "Jobjörn",
      id: 1,
    },
    {
      name: "Hedvig",
      id: 2,
    },
  ];

  if (user && tunes) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Header size={"large"}>Tunes & Friends</Header>
        <div style={{ padding: "50px 0" }}>
          <Header size={"small"}>Newest Friends</Header>
          {friends &&
            friends.map((data: Data) => (
              <StyledTable
                onClickHandle={() => {}}
                know={true}
                pathname={""}
                data={data}
                slug={""}
              />
            ))}
          <Header size={"small"}>Newest Tunes</Header>
          {Data.map((data) => (
            <StyledTable
              onClickHandle={() => {}}
              know={false}
              pathname={""}
              data={data}
              slug={""}
            />
          ))}
          <Header size={"small"}>Friends newest tunes</Header>
          {Data.map((data) => (
            <StyledTable
              onClickHandle={() => {}}
              know={false}
              pathname={""}
              data={data}
              slug={""}
            />
          ))}
        </div>
        <Menu />
      </Box>
    );
  }
};

export default IndexPage;
