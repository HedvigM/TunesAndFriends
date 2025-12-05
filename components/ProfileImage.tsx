type ProfileImageProps = {
  size: "small" | "large";
  picture: string | null;
};

export const ProfileImage = ({size, picture}: ProfileImageProps) => {
  return (
    <div style={{
      height: size === "small" ? "80px" : "110px",
      width: size === "small" ? "80px" : "110px",
      borderRadius: "50%",
      backgroundColor: `var(--color-secondary)`,
      border: picture ? "1px solid black" : "none",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {picture ? (
        <img
          src={picture}
          alt="profile image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%"
          }}
        />
      ) : null}
    </div>
  );
};
