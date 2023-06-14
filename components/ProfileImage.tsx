import { colors } from "styles/theme";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, styled } from "@mui/material";
import { useEffect, useState } from "react";

function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

type ProfileImageProps = {
  size: "small" | "large";
  profilePicture?: string;
  newPicture?: (picture: string) => void;
};

export const ProfileImage = (props: ProfileImageProps) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (image) {
      props.newPicture(image);
    }
  }, [image]);

  return (
    <OuterContainer size={props.size}>
      {props.profilePicture || props.profilePicture !== undefined ? (
        <StyledAvatar
          size={props.size}
          src={image ? image : props.profilePicture}
        ></StyledAvatar>
      ) : (
        <StyledAvatar size={props.size} color="primary"></StyledAvatar>
      )}
      <PlusContainer
        onClick={() => {
          document.getElementById("getFile")?.click();
        }}
        size={props.size}
      >
        <AddIcon />
      </PlusContainer>
      <input
        type="file"
        id="getFile"
        style={{ display: "none" }}
        onChange={async (e: any) => {
          const file = e.target.files[0];
          const base64 = (await toBase64(file)) as string;
          setImage(base64);
        }}
      />
    </OuterContainer>
  );
};

const OuterContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "size",
})<ProfileImageProps>((props) => ({
  height: props.size === "small" ? "80px" : "110px",
  width: props.size === "small" ? "80px" : "110px",
}));

const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== "size",
})<ProfileImageProps>((props) => ({
  height: props.size === "small" ? "80px" : "110px",
  width: props.size === "small" ? "80px" : "110px",
  borderRadius: "50%",
  backgroundColor: `${colors.second}`,
  border: "1px solid black",
  zIndex: -1,
}));

const PlusContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "size",
})<ProfileImageProps>((props) => ({
  display: props.size === "small" && "none",
  height: "30px",
  width: "30px",
  borderRadius: "50%",
  backgroundColor: `${colors.first}`,
  border: "1px solid black",
  margin: "-31px 79px",
  zIndex: "2",
  ":hover": {
    cursor: "pointer",
    backgroundColor: `${colors.firstLight}`,
    /* color: "#f2ff8f" */
  },
}));
