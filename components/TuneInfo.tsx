import { styled, Typography } from "@mui/material";

type TuneInfo = {
  type: string;
  knownBy?: KnownByProp[];
};
type KnownByProp = {
  name: string;
  auth0UserId: string;
};

export const TuneInfo = ({ type, knownBy }) => {
  console.log({ knownBy });
  return (
    <OuterContainer>
      <TuneType>type: {type}</TuneType>
      <FriendsContainer>
        <div>known by:</div>
        <FriendsList>
          {knownBy &&
            knownBy.map((knownBy: KnownByProp) => (
              <Typography fontSize="small">{`${knownBy.name},`}</Typography>
            ))}
        </FriendsList>
      </FriendsContainer>
    </OuterContainer>
  );
};

const OuterContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;
const TuneType = styled("div")`
  border: 1px solid black;
  border-bottom: none;
`;
const FriendsContainer = styled("div")`
  border: 1px solid black;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;
`;
const FriendsList = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
