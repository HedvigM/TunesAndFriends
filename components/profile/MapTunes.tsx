import { Box, Typography } from "@mui/material";
import Link from "next/link";

interface MapTunesProps {
  tunes: Array<{ id: number; name: string; type: string }>;
  commonTunes?: Array<{ id: number; name: string; type: string }>;
}

export const MapTunes = (props: MapTunesProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 10px",
          minWidth: "350px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "flex-start",
          }}
        >
          <Typography variant="h2" sx={{ borderBottom: "1px solid black" }}>
            Tunes
          </Typography>
          {props.tunes.map((tunes, index) => (
            <Box key={index}>
              <Link
                href={{
                  pathname: `/detailedtune/[slug]`,
                  query: { slug: `${tunes.id}` },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 300,
                    color: "text.primary",
                    display: "inline",
                    textalign: "center",
                    fontFamily: "Roboto",
                    margin: "1px",
                    padding: "0 3px",
                    ":hover": {
                      color: "text.primary",
                      backgroundColor: "deeppink",
                      cursor: "pointer",
                      padding: "0 3px",
                    },
                  }}
                >
                  {tunes}
                </Typography>
              </Link>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "flex-start",
          }}
        >
          {props.commonTunes && (
            <Typography variant="h2" sx={{ borderBottom: "1px solid black" }}>
              In common
            </Typography>
          )}
          {props.commonTunes &&
            props.commonTunes.map((tunes, index) => (
              <Box key={index} sx={{}}>
                <Link
                  href={{
                    pathname: `/detailedtune/[slug]`,
                    query: { slug: `${tunes.id}` },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 300,
                      color: "text.primary",
                      display: "inline",
                      textAlign: "center",
                      fontFamily: "Roboto",
                      margin: "1px",
                      padding: "0 3px",
                      ":hover": {
                        color: "text.primary",
                        backgroundColor: "deeppink",
                        cursor: "pointer",
                        padding: "0 3px",
                      },
                    }}
                  >
                    {tunes}
                  </Typography>
                </Link>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
