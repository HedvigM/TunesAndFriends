import { colors, theme } from "styles/theme";
import AddIcon from "@mui/icons-material/Add";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, Badge, styled } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useUser } from "@auth0/nextjs-auth0";

type ProfileImageProps = {
  size: "small" | "large";
};

export const ProfileImage = (props: ProfileImageProps) => {
  const { user } = useUser();
  return (
    <OuterContainer size={props.size}>
      {user?.picture ? (
        <StyledAvatar size={props.size} src={user.picture}></StyledAvatar>
      ) : (
        <StyledAvatar size={props.size} color="primary"></StyledAvatar>
      )}
      <PlusContainer size={props.size}>
        <AddIcon />
      </PlusContainer>
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
}));

/* const PlusContainer = styled("div")`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: ${colors.first};
  border: 1px solid black;
  margin: -31px 79px;
  z-index: 2;
`; */
