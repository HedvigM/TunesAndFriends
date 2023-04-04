import { Box, Container, styled, Typography } from "@mui/material";
import Link from "next/link";
import { colors } from "styles/theme";

interface TableProps {
  onClickHandle: (id: number) => void;
  know: boolean;
  pathname: string;
  slug: string | number;
  data: TableData;
}

export type TableData = {
  name: string;
  id: number;
};
export const StyledTable = ({
  data,
  onClickHandle,
  know,
  pathname,
  slug,
}: TableProps) => {
  return (
    <Container maxWidth="sm" sx={{ margin: "0" }}>
      <Box
        sx={{
          borderTop: "1px solid grey",
          "&:last-child td, &:last-child th": { border: 0 },
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "80% 1fr",
        }}
      >
        <Link
          href={{
            pathname: `${pathname}`,
            query: { slug: `${slug}` },
          }}
        >
          <StyledTypography variant="body1">{data.name}</StyledTypography>
        </Link>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5px 0",
          }}
        >
          <StyledButton know={know} onClick={() => onClickHandle(data.id)}>
            add
          </StyledButton>
        </Box>
      </Box>
    </Container>
  );
};

type TableStyledProps = {
  know: boolean;
};

const StyledButton = styled("button")<TableStyledProps>((props) => ({
  backgroundColor: props.know ? "inherit" : colors.second,
  padding: "5px 10px",
  border: `1px solid ${colors.second}`,
  borderRadius: "3px",

  "&:hover": {
    cursor: "pointer",
  },
}));
const StyledTypography = styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
  color: black;
  display: inline;
  width: fit-content;
  padding-right: 10px;
  padding-left: 2px;
  text-align: left;
  margin: 1px;

  :hover {
    color: line-clamp;
    background-color: ${colors.first};
    cursor: pointer;
  }
`;
