import { styled } from "@mui/material";
import { ReactNode } from "react";
import { colors, theme } from "styles/theme";

interface HeaderProps {
  children: ReactNode;
  size: "small" | "large";
}
export const Header = ({ children, size }: HeaderProps) => (
  <OuterContainer>
    <HeaderContainer size={size}>
      {size === "large" && <H1>{children}</H1>}
      {size === "small" && <H3>{children}</H3>}
    </HeaderContainer>
  </OuterContainer>
);

const OuterContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

const HeaderContainer = styled("div")<HeaderProps>((props) => ({
  height: props.size === "small" ? "12px" : "23px",
  width: "fit-content",
  padding: "0 10px",
  marginTop: "41px",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  backgroundColor: colors.first,
  textTransform: "uppercase",
}));

const H1 = styled("h1")({
  fontWeight: 400,
  margin: 0,
  padding: 0,
});
const H3 = styled("h3")({
  fontWeight: 400,
  margin: 0,
  padding: 0,
});
