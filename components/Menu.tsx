import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { addUser } from "services/local";
import router, { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PeopleIcon from "@mui/icons-material/People";
import { colors } from "styles/theme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Menu = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (typeof user !== "undefined" && isLoading === false) {
      addUser(user);
    }
  }, [user, isLoading]);

  return (
    <Box>
      <OuterContainer>
        <LinkContainer active={router.route === "/"}>
          <Link href="/">
            <Typography
              variant="body1"
              noWrap
              sx={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <HomeIcon />
            </Typography>
          </Link>
        </LinkContainer>
        <LinkContainer
          active={
            router.route.includes("friend") && router.query.slug !== user.sub
          }
        >
          <Link href="/friends">
            <Typography
              variant="body1"
              noWrap
              sx={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <PeopleIcon />
            </Typography>
          </Link>
        </LinkContainer>
        <LinkContainer active={router.route.includes("tune")}>
          <Link href="/tunes">
            <Typography
              variant="body1"
              noWrap
              sx={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <MusicNoteIcon />
            </Typography>
          </Link>
        </LinkContainer>

        <LinkContainer active={router.query.slug === user.sub}>
          <Link
            href={{
              pathname: `/friend/[slug]`,
              query: { slug: `${user.sub}` },
            }}
          >
            <Typography
              variant="body1"
              noWrap
              sx={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <AccountCircleIcon />
            </Typography>
          </Link>
        </LinkContainer>
      </OuterContainer>
    </Box>
  );
};

type MenuIndexProps = {
  index: string;
};
const Div = styled("div")<MenuIndexProps>((props) => ({
  backgroundColor:
    (props.index === "1" && colors.second) ||
    (props.index === "2" && colors.third) ||
    (props.index === "3" && colors.first) ||
    (props.index === "4" && colors.fourth),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ":hover": {
    cursor: "pointer",
    backgroundColor: colors.first,
  },
}));

const OuterContainer = styled("div")(() => ({
  color: "black",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  padding: "0",
}));

type MenuhrefProps = {
  active: boolean;
};

const LinkContainer = styled("div")<MenuhrefProps>((props) => ({
  backgroundColor: props.active ? colors.first : colors.second,
  /* router.asPath.includes(props.href)
    ? colors.first
    : colors.second, */
  height: "100%",
  padding: "5px 10%",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
}));
