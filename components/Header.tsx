import { styled } from "@mui/material";
import { colors, theme } from "styles/theme";

interface HeaderProps {
  children: string;
  size: "small" | "large";
}
export const Header = ({ children, size }: HeaderProps) => {
  return (
    <OuterContainer>
      <HeaderContainer>
        {size === "large" && <H1>{children.toLocaleUpperCase()}</H1>}
        {size === "small" && <H3>{children.toLocaleUpperCase()}</H3>}
      </HeaderContainer>
    </OuterContainer>
  );
};

const OuterContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
});
const HeaderContainer = styled("div")({
  height: "23px", // small     height: 12px;
  width: "fit-content",
  padding: "0 10px",
  marginTop: "41px",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  backgroundColor: colors.first,
});
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
