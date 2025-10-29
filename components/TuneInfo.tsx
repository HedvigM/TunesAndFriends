import {  Typography } from "@mui/material";

type TuneInfoProps = {
  type: string;
  knownBy: KnownByProp[];
};

type KnownByProp = {
  name: string;
  auth0UserId: string;
};

export const TuneInfo = ({ type, knownBy }: TuneInfoProps) => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
      <Typography sx={{ fontWeight: "bold" }} fontSize="small">Type:</Typography>
      <Typography fontSize="small">{type}</Typography>
      </div>

        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
      <Typography sx={{ fontWeight: "bold" }} fontSize="small">known by:</Typography>
          {knownBy && knownBy.length > 0 &&
            knownBy.map((knownBy: KnownByProp) => (
              <Typography fontSize="small">{`${knownBy.name},`}</Typography>
            ))}
          {knownBy && knownBy.length === 0 &&
            <Typography fontSize="small">No one knows this tune</Typography>
          }
        </div>
      </div>
  );
};

