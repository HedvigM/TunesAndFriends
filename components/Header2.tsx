import { styled } from "@mui/material";
import { colors, theme } from "styles/theme";

interface Header2Props {
  children: string;
}
export const Header2 = ({ children }: Header2Props) => {
  return (
    <OuterContainer>
      <HeaderContainer>
        <H1>{children.toLocaleUpperCase()}</H1>
      </HeaderContainer>
    </OuterContainer>
  );
};

const HeaderContainer = styled("div")({
  height: "23px",
  width: "fit-content",
  padding: "0 10px",
  marginTop: "41px",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  backgroundColor: colors.first,
});
const OuterContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
});
const H1 = styled("h1")({
  fontWeight: 400,
  margin: 0,
  padding: 0,
});
