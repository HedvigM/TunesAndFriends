import { Box, Button, Container, styled, Typography } from "@mui/material";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TUNE_URL } from "utils/urls";
import {
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
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({
    name: "Loading...",
    type: "Loading...",
  });
  const [abc, setAbc] = useState(
    "|:E2BE dEBE|E2BE AFDF|E2BE dEBE|BABc dAFD:|!d2fd c2ec|defg afge|d2fd c2ec|BABc dAFA|!d2fd c2ec|defg afge|afge fdec|BABc dAFD|"
  );

  const router = useRouter();
  const { slug: slug } = router.query;

  const abcjs = process.browser ? require("abcjs") : null;

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              padding: "15px 0",
            }}
          ></Box>
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

export default withPageAuthRequired<WithPageAuthRequiredProps>(detailedtune);
