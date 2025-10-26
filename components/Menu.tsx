import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { getOrCreateUser } from "lib/api";
import router from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PeopleIcon from "@mui/icons-material/People";
import { colors } from "styles/theme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Menu = () => {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (typeof user !== "undefined" && isLoading === false && user) {
      getOrCreateUser(user).then((result) => {
        if (!result.success) {
          console.error("Failed to get/create user in Menu:", result.error);
        }
      });
    }
  }, [user, isLoading]);

  return (
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
        <LinkContainer href={`/friends`}>
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
        <LinkContainer href={`/tunes`}>
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
        {user && user.sub !== undefined && (
          <LinkContainer href="/friend/[slug]">
            <Link
              href={{
                pathname: "/friend/[slug]",
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
            )}
      </OuterContainer>
    </Box>
  );
};

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
  backgroundColor: router.asPath === props.href ? colors.first : colors.second,
  height: "100%",
  padding: "5px 10%",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
}));
