import { styled } from "@mui/material";

type TuneInfo = {
  type: string;
  knownBy: string;
};

export const TuneInfo = ({ type, knownBy }) => {
  return (
    <OuterContainer>
      <TuneType>type: {type}</TuneType>
      <FriendsList>known by: {knownBy}</FriendsList>
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
const FriendsList = styled("div")`
  border: 1px solid black;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;
`;
