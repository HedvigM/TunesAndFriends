import Link from "next/link";
import { Typography } from "styles/Typography";

type TuneInfoProps = {
  type: string;
  knownBy: KnownByProp[];
};

type KnownByProp = {
  name: string;
  id: number;
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
            knownBy.map((user: KnownByProp) => (
              <Link key={user.id} href={`/friend/${user.id}`}>
              <Typography  variant="body">{`${user.name},`}</Typography>
              </Link>
            ))}
          {knownBy && knownBy.length === 0 &&
            <Typography variant="body">No one knows this tune</Typography>
          }
        </div>
      </div>
  );
};

