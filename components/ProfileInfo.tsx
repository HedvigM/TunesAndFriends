"use client";
import { Typography } from "styles/Typography";

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
    <div>
      <div style={{display: "flex", gap: "10px"}}>
          <Typography variant="body">TUNES: </Typography>
          <Typography variant="body">{tunesCount}</Typography>
      </div>

      <div style={{display: "flex", gap: "10px"}}>
          <Typography variant="body">FOLLOWING: </Typography>
          <Typography variant="body">{following}</Typography>
      </div>
      <div style={{display: "flex", gap: "10px"}}>
          <Typography variant="body">FOLLOWERS: </Typography>
          <Typography variant="body">{followers}</Typography>
      </div>
      <div style={{display: "flex", gap: "10px"}}>
        <Typography variant="body">PROFILETEXT: </Typography>
        <Typography variant="body">{profileText}</Typography>
      </div>

    </div>
  );
};
