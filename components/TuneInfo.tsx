import { Typography } from "styles/Typography";

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
      <Typography variant="body">Type:</Typography>
      <Typography variant="body">{type}</Typography>
      </div>

        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
      <Typography variant="body">known by:</Typography>
          {knownBy && knownBy.length > 0 &&
            knownBy.map((knownBy: KnownByProp) => (
              <Typography key={knownBy.auth0UserId} variant="body">{`${knownBy.name},`}</Typography>
            ))}
          {knownBy && knownBy.length === 0 &&
            <Typography variant="body">No one knows this tune</Typography>
          }
        </div>
      </div>
  );
};

