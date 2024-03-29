import { styled, Typography } from "@mui/material";

type ProfileInfoProps = {
  profileText?: string;
  tunesCount: number;
  following: number;
  followers: number;
};

export const ProfileInfo = ({
  profileText,
  tunesCount,
  following,
  followers,
}: ProfileInfoProps) => {
  return (
    <OuterContainer>
      <StatsContainer>
        <StatsHeading>
          <Typography sx={{ fontSize: "12px" }} variant="body2">
            TUNES
          </Typography>
        </StatsHeading>
        <div>
          <Typography>{tunesCount}</Typography>
        </div>
      </StatsContainer>
      <StatsContainer>
        <StatsHeading>
          <Typography sx={{ fontSize: "12px" }} variant="body2">
            FOLLOWING
          </Typography>
        </StatsHeading>
        <div>
          <Typography>{following}</Typography>
        </div>
      </StatsContainer>
      <StatsContainer>
        <StatsHeading>
          <Typography sx={{ fontSize: "12px" }} variant="body2">
            FOLLOWERS
          </Typography>
        </StatsHeading>
        <div>
          <Typography>{followers}</Typography>
        </div>
      </StatsContainer>
      <ProfileText>{profileText}</ProfileText>
    </OuterContainer>
  );
};

const OuterContainer = styled("div")((props) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "1fr 1fr 1fr",
  margin: "0px",
}));
const StatsContainer = styled("div")((props) => ({
  height: "35px",
  width: "100%",
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  border: "1px solid black",
  textAlign: "center",
  justifyContent: "center",
}));
const StatsHeading = styled("div")((props) => ({
  margin: "-9px 4px",
  padding: "0 35px",
  backgroundColor: "white",
  height: "fit-content",
  width: "60px",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
}));
const ProfileText = styled("div")((props) => ({
  width: "100%",
  border: "1px solid black",
  borderTop: "none",
  gridArea: "2 / 1 / 4 / 4",
  padding: "10px",
}));
