import { styled, Table, TableCell, TableRow, Typography } from "@mui/material";
import Link from "next/link";
import { colors } from "styles/theme";
import { LoadingSpinner } from "./LoadingSpinner";

interface TableProps {
  onClickHandle: (id: number) => void;
  know: boolean;
  pathname: string;
  slug: string | number;
  data: Data;
}

export type Data = {
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
    <Table size="small" sx={{ margin: "0", padding: "0px" }}>
      <TableRow
        sx={{
          borderTop: "1px solid grey",
          "&:last-child td, &:last-child th": { border: 0 },
          display: "grid",
          gridTemplateColumns: "80% 1fr",
        }}
      >
        <TableCell component="th" scope="row">
          <Link
            href={{
              pathname: `${pathname}`,
              query: { slug: `${slug}` },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                fontWeight: "400",
                color: "text.primary",
                display: "inline",
                textAlign: "center",
                margin: "1px",

                "&:hover": {
                  color: "text.primary",
                  backgroundColor: "deeppink",
                  cursor: "pointer",
                },
              }}
            >
              {data.name}
            </Typography>
          </Link>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledButton know={know} onClick={() => onClickHandle(data.id)}>
            add
          </StyledButton>
        </TableCell>
      </TableRow>
    </Table>
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
