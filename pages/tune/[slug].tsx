import { Box, Button, styled } from "@mui/material";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TUNE_URL } from "utils/urls";
import {
  useUser,
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from "@auth0/nextjs-auth0";
import { NextPage } from "next";
import { getMyCache } from "services/functions";
import { Menu } from "components/Menu";
import { Header } from "components/Header";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { colors } from "styles/theme";
import { TuneInfo } from "components/TuneInfo";
import { addTune, getUser, listUsersWithTune } from "services/local";
import {
  ContentContainer,
  LogoContainer,
  OuterAppContainer,
  StickyMenuContainer,
} from "styles/layout";
import { User } from "lib/api";

type MusicProps = {
  abcNotes: string;
};

export const Music = (props: MusicProps) => {
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
  const [usersTuneList, setUsersTuneList] = useState<User[]>([]);
  const [_loading, setLoading] = useState(true);
  const [mapKnow, setMapKnow] = useState<number[]>([]);
  const [details, setDetails] = useState({
    name: "Loading...",
    type: "Loading...",
    id: "Loading",
  });
  const [abc, _setAbc] = useState(
    "|:E2BE dEBE|E2BE AFDF|E2BE dEBE|BABc dAFD:|!d2fd c2ec|defg afge|d2fd c2ec|BABc dAFA|!d2fd c2ec|defg afge|afge fdec|BABc dAFD|"
  );

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
    if (parsedSlug) {
      getListOfTuneUsers(parsedSlug);
    }
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
    const getDetailedTune = async () => {
      const data = await getMyCache(TUNE_URL(slug));
      setDetails(data);
      setLoading(false);
    };
    getDetailedTune();
  }, [slug]);

  const onBackClickHandle = () => {
    router.back();
  };
  const onKnowHandle = () => {
    if (!user || !user.email) return;
    let newMapKnow = mapKnow.slice();
    newMapKnow.push(parseInt(details.id as string, 10));
    setMapKnow(newMapKnow || [] as number[]);
    addTune(details.id, user.email, "know");
  };

  return (
    <OuterAppContainer>
      <LogoContainer>
        <Header textAlign="left" size="small" color="blue">
          T&F
        </Header>
      </LogoContainer>
      <ContentContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row-reverse",
          }}
        >
          <Header size="small" textAlign="center" color="blue">
            {details.name}
          </Header>
          <StyleBackdButton
            size="small"
            variant="text"
            onClick={onBackClickHandle}
          >
            <ArrowBackIosNewIcon />
          </StyleBackdButton>
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 0",
          }}
        >
          <div style={{ width: "85%" }}>
            <Music abcNotes={abc} />
            <StyledAddButton
              know={mapKnow !== undefined && mapKnow.includes(parseInt(details.id as string, 10))}
              onClick={onKnowHandle}
            >
              Add
            </StyledAddButton>
            <TuneInfo type={details.type} knownBy={usersTuneList} />
          </div>
        </Box>
      </ContentContainer>
      <StickyMenuContainer>
        <Menu />
      </StickyMenuContainer>
    </OuterAppContainer>
  );
};

export const StyleBackdButton = styled(Button)`
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
