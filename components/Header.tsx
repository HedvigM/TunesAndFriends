import { styled } from "@mui/material";
import { ReactNode } from "react";
import { colors, theme } from "styles/theme";

interface HeaderProps {
  children: ReactNode;
  size: "small" | "medium" | "large";
  textAlign: "left" | "center";
}
export const Header = ({ children, size, textAlign }: HeaderProps) => (
  <OuterContainer textAlign={textAlign}>
    <HeaderContainer size={size}>
      {size === "large" && <H1>{children}</H1>}
      {size === "medium" && <H2>{children}</H2>}
      {size === "small" && <H3>{children}</H3>}
    </HeaderContainer>
  </OuterContainer>
);

type OuterContainerStyles = {
  textAlign: string;
};
type HeaderContainerStyles = {
  size: string;
};

const OuterContainer = styled("div")<OuterContainerStyles>((props) => ({
  display: "flex",
  justifyContent:
    (props.textAlign === "left" && "left") ||
    (props.textAlign === "center" && "center"),
  width: "100%",
}));

const HeaderContainer = styled("div")<HeaderContainerStyles>((props) => ({
  textTransform: "uppercase",
}));

const H1 = styled("h1")({
  fontWeight: 400,
  margin: 0,
  padding: 0,
  position: "relative",

  "&::before": {
    content: '""',
    backgroundColor: colors.first,
    height: "20px",
    bottom: "0",
    position: "absolute",
    zIndex: "-1",
    margin: "0 -10px",
    width: "-webkit-fill-available",
  },
});

const H2 = styled("h2")({
  fontWeight: 400,
  margin: 0,
  padding: 0,
  position: "relative",

  "&::before": {
    content: '""',
    backgroundColor: colors.first,
    height: "14px",
    bottom: "0",
    position: "absolute",
    zIndex: "-1",
    margin: "0 -10px",
    width: "-webkit-fill-available",
  },
});

const H3 = styled("h3")({
  fontWeight: 400,
  margin: 0,
  padding: 0,
  position: "relative",

  "&::before": {
    content: '""',
    backgroundColor: colors.first,
    height: "14px",
    bottom: "0",
    position: "absolute",
    zIndex: "-1",
    margin: "0 -10px",
    width: "-webkit-fill-available",
  },
});
