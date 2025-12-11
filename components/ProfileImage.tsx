import Image from "next/image";

type ProfileImageProps = {
  size: "small" | "large";
  picture: string | null;
};

export const ProfileImage = ({size, picture}: ProfileImageProps) => {
  const dimensions = size === "small" ? 80 : 110;
  
  return (
    <div style={{
      height: `${dimensions}px`,
      width: `${dimensions}px`,
      borderRadius: "50%",
      backgroundColor: `var(--color-secondary)`,
      border: picture ? "1px solid black" : "none",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    }}>
      {picture ? (
        <Image
          src={picture}
          alt="Profile picture"
          fill
          sizes={`${dimensions}px`}
          priority
          style={{
            objectFit: "cover",
            borderRadius: "50%"
          }}
          unoptimized // Use unoptimized for external URLs not in remotePatterns
        />
      ) : null}
    </div>
  );
};
