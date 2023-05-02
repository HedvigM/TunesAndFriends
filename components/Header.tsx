import { styled } from "@mui/material";
import { ReactNode } from "react";
import { colors } from "styles/theme";

type HeaderProps = {
  children: ReactNode;
  size: "small" | "medium" | "large";
  textAlign: "left" | "center";
  color?: "yellow" | "blue";
};
export const Header = ({ children, size, textAlign, color }: HeaderProps) => (
  <OuterContainer textAlign={textAlign}>
    <HeaderContainer size={size}>
      {size === "large" && <H1 color={color}>{children}</H1>}
      {size === "medium" && <H2 color={color}>{children}</H2>}
      {size === "small" && <H3 color={color}>{children}</H3>}
    </HeaderContainer>
  </OuterContainer>
);

type OuterContainerStyleProps = {
  textAlign: string;
};
type HeaderContainerStyleProps = {
  size: string;
};
type TextProps = {
  color: "yellow" | "blue";
};

const OuterContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "textAlign",
})<OuterContainerStyleProps>((props) => ({
  display: "flex",
  justifyContent:
    (props.textAlign === "left" && "left") ||
    (props.textAlign === "center" && "center"),
  width: "100%",
}));

const HeaderContainer = styled("div")<HeaderContainerStyleProps>((props) => ({
  textTransform: "uppercase",
}));

const H1 = styled("h1")<TextProps>((props) => ({
  fontWeight: 400,
  margin: 0,
  padding: 0,
  position: "relative",

  "&::before": {
    content: '""',
    backgroundColor: props.color === "blue" ? colors.second : colors.first,
    height: "20px",
    bottom: "0",
    position: "absolute",
    zIndex: "-1",
    margin: "0 -10px",
    width: "-webkit-fill-available",
  },
}));

const H2 = styled("h2")<TextProps>((props) => ({
  fontWeight: 400,
  margin: 0,
  padding: 0,
  position: "relative",

  "&::before": {
    content: '""',
    backgroundColor: colors.second,
    height: "14px",
    bottom: "0",
    position: "absolute",
    zIndex: "-1",
    margin: "0 -10px",
    width: "-webkit-fill-available",
  },
}));

const H3 = styled("h3")<TextProps>((props) => ({
  fontWeight: 400,
  margin: 0,
  padding: 0,
  position: "relative",

  "&::before": {
    content: '""',
    backgroundColor: props.color === "blue" ? colors.second : colors.first,
    height: "14px",
    bottom: "0",
    position: "absolute",
    zIndex: "-1",
    margin: "0 -10px",
    width: "-webkit-fill-available",
  },
}));
