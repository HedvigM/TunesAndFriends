import { Box, Button, Container, styled, Typography } from "@mui/material";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TUNE_URL } from "utils/urls";
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from "@auth0/nextjs-auth0";
import { NextPage } from "next";
import { LoadingSpinner } from "components/LoadingSpinner";
import { getMyCache } from "services/functions";
import { Menu } from "components/Menu";
import { Header } from "components/Header";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { colors } from "styles/theme";
import { TuneInfo } from "components/TuneInfo";
import { addTune, getUser } from "services/local";

export const Music = (props) => {
  let lineBreak = (string: string) => {
    return string.replaceAll("!", "\n");
  };

  useEffect(() => {
    const abcjsInit = async () => {
      const abcjs = await import("abcjs");
      abcjs.renderAbc("paper", lineBreak(props.abcNotes), {
        responsive: "resize",
      });
    };
    abcjsInit();
  }, []);

  return <div id="paper"></div>;
};

const detailedtune: NextPage<{}> = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [mapKnow, setMapKnow] = useState([]);
  const [details, setDetails] = useState({
    name: "Loading...",
    type: "Loading...",
    id: "Loading",
  });
  const [abc, setAbc] = useState(
    "|:E2BE dEBE|E2BE AFDF|E2BE dEBE|BABc dAFD:|!d2fd c2ec|defg afge|d2fd c2ec|BABc dAFA|!d2fd c2ec|defg afge|afge fdec|BABc dAFD|"
  );

  const router = useRouter();
  const { slug: slug } = router.query;

  const abcjs = process.browser ? require("abcjs") : null;

  useEffect(() => {
    const fetchUserWithId = async () => {
      if (user) {
        const newUserWithId = await getUser(user?.sub as string);
        if (newUserWithId.success) {
          let newKnowTunes = await newUserWithId.data?.knowTunes?.map(
            (tunes: { sessionId: number }) => tunes.sessionId
          );
          setMapKnow(newKnowTunes);
        }
      }
    };

    fetchUserWithId();
  }, [user]);

  useEffect(() => {
    setLoading(true);
    const getDetailedTune = async () => {
      const data = await getMyCache(TUNE_URL(slug));
      setDetails(data);
      setLoading(false);
    };
    getDetailedTune();
  }, [slug]);

  const onClickHandle = () => {
    router.back();
  };
  const onKnowHandle = () => {
    let newMapKnow = mapKnow.slice();
    newMapKnow.push(details.id);
    setMapKnow(newMapKnow);
    addTune(details.id, user.email, "know");
  };

  if (details && !loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Container maxWidth="lg">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row-reverse",
            }}
          >
            <Header size="large">{details.name}</Header>
            <StyledButton size="small" variant="text" onClick={onClickHandle}>
              <ArrowBackIosNewIcon />
            </StyledButton>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "80%",
              }}
            >
              <Typography
                variant="h2"
                textAlign="left"
                sx={{ padding: "20px 0" }}
              >
                {details.type}
              </Typography>
            </Box>
          </Box>
          <Music abcNotes={abc} />
          <StyledAddButton
            know={mapKnow.includes(details.id)}
            onClick={onKnowHandle}
          >
            Add
          </StyledAddButton>
          <TuneInfo type={details.type} knownBy={undefined} />
        </Container>
        <Menu />
      </Box>
    );
  } else {
    return <LoadingSpinner />;
  }
};

const StyledButton = styled(Button)`
  color: ${colors.third};
  padding: 0;
  min-width: fit-content;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

type TuneStyledProps = {
  know: boolean;
};

const StyledAddButton = styled("button")<TuneStyledProps>((props) => ({
  backgroundColor: props.know ? "inherit" : colors.second,
  padding: "5px 10px",
  margin: "10px 0",
  border: `1px solid ${colors.second}`,
  borderRadius: "3px",

  "&:hover": {
    cursor: "pointer",
  },
}));

export default withPageAuthRequired<WithPageAuthRequiredProps>(detailedtune);
