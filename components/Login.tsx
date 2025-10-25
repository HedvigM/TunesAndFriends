import { Container, styled, Typography } from "@mui/material";
import Link from "next/link";
import { colors } from "styles/theme";

export const Login = () => {
  return (
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
              color: "white",
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

type StyledLoginProps = {
  index: string;
};
const Div = styled("div")<StyledLoginProps>(({ index }) => ({
  backgroundColor:
    (index === "1" && colors.second) ||
    (index === "2" && colors.third) ||
    (index === "3" && colors.second) ||
    (index === "4" && colors.third) ||
    "transparent",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ":hover": {
    cursor: "pointer",
    backgroundColor: colors.first,
  },
}));
