"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

type ProfileImageProps = {
  size: "small" | "large";
};

const smallProfileImage = (userPicture: string) => {
  return (
    <div style={{
      height: "80px",
      width: "80px",
      borderRadius: "50%",
      backgroundColor: `var(--color-secondary)`,
      border: "1px solid black",
      zIndex: -1,
      overflow: "hidden"
    }}>
      <img src={userPicture} alt="small profile image" />
    </div>
  )
}

const largeProfileImage = (userPicture: string) => {
  return (
    <div style={{
      height: "110px",
      width: "110px",
      borderRadius: "50%",
      backgroundColor: `var(--color-secondary)`,
      border: "1px solid black",
      zIndex: -1,
      overflow: "hidden"
    }}>
      <img src={userPicture} alt="large profile image" style={{width: "100%", height: "100%"}} />
    </div>
  )
}

export const ProfileImage = (props: ProfileImageProps) => {
  const { user } = useUser();
  return (
    <div>
      {props.size === "small" ? smallProfileImage(user?.picture || "") : largeProfileImage(user?.picture || "")}
    </div>
  );
};
