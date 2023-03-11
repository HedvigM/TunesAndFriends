import { Box, Button, Container, MenuProps, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { addUser } from "services/local";
import router, { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PeopleIcon from "@mui/icons-material/People";
import { colors } from "styles/theme";

export const Menu = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (typeof user !== "undefined" && isLoading === false) {
      addUser(user);
    }
  }, [user, isLoading]);

  return user ? (
    <Box>
      <OuterContainer>
        <LinkContainer href="/">
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
        <LinkContainer href="/friends">
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
        <LinkContainer href="/tunes">
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

        <LinkContainer href="/profile">
          <Link href="/profile">
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
              <SettingsSuggestIcon />
            </Typography>
          </Link>
        </LinkContainer>
      </OuterContainer>
    </Box>
  ) : (
    <Container
      sx={{
        height: "100vh",
        display: "grid",
        gridTemplateRows: "1fr 1fr 1fr 1fr",
        padding: "0",
      }}
    >
      <Link href="/api/auth/login">
        <Div index="1">
          <Typography
            variant="h1"
            noWrap
            sx={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              fontWeight: "400",
            }}
          >
            LOG IN
          </Typography>
        </Div>
      </Link>
      <Div index="2">
        <Link href="/friends">
          <Typography
            variant="h1"
            noWrap
            sx={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              fontWeight: "400",
            }}
          >
            ABOUT
          </Typography>
        </Link>
      </Div>
      <Div index="3">
        <Link href="/friends">
          <Typography
            variant="h1"
            noWrap
            sx={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              fontWeight: "400",
            }}
          >
            HELLO
          </Typography>
        </Link>
      </Div>
      <Div index="4">
        <Link href="/friends">
          <Typography
            variant="h1"
            noWrap
            sx={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              fontWeight: "400",
            }}
          >
            HELLO
          </Typography>
        </Link>
      </Div>
    </Container>
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
  href: string;
};

const LinkContainer = styled("div")<MenuhrefProps>((props) => ({
  backgroundColor: router.asPath.includes(props.href)
    ? colors.first
    : colors.second,
  /* padding: theme.spacing(0, 2), */
  height: "100%",
  padding: "5px 10%",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
}));
