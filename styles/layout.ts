import { styled } from "@mui/material";

export const OuterAppContainer = styled("div")`
  height: 100vh;
  display: grid;
  grid-template-rows: 30px 1fr 37px;
`;

export const LogoContainer = styled("div")`
   margin-left: 20px; 
`;

export const ContentContainer = styled('div')`
/* width: 85%; */
`
export const StickyMenuContainer = styled("div")`
  position: sticky;
  bottom: 0;
  width: 100%;
`;