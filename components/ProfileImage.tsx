import { colors, theme } from "styles/theme";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material";

type ProfileImageProps = {
  size: "small" | "large";
};

export const ProfileImage = (props: ProfileImageProps) => {
  return (
    <OuterContainer size={props.size}>
      <Circle size={props.size}></Circle>
      {props.size === "large" && (
        <PlusContainer>
          <AddIcon />
        </PlusContainer>
      )}
    </OuterContainer>
  );
};

const OuterContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "size",
})<ProfileImageProps>((props) => ({
  height: props.size === "small" ? "80px" : "110px",
  width: props.size === "small" ? "80px" : "110px",
}));

const Circle = styled("div", {
  shouldForwardProp: (prop) => prop !== "size",
})<ProfileImageProps>((props) => ({
  height: props.size === "small" ? "80px" : "110px",
  width: props.size === "small" ? "80px" : "110px",
  borderRadius: "50%",
  backgroundColor: `${colors.second}`,
  border: "1px solid black",
}));

const PlusContainer = styled("div")`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: ${colors.first};
  border: 1px solid black;
  margin: -31px 79px;
`;

/*     <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "30px",
                }}
              >
                <Avatar
                  alt='users avatar'
                  sx={{
                    width: { xs: "100px", sm: "200px" },
                    height: { xs: "100px", sm: "200px" },
                  }}
                  src={user.picture}
                />
              </Box> */
