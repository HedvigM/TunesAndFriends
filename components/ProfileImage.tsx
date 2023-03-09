import { colors, theme } from "styles/theme";
import AddIcon from "@mui/icons-material/Add";

export const ProfileImage = () => {
  return (
    <div
      style={{
        height: "90px",
        width: "90px",
      }}
    >
      <div
        style={{
          height: "90px",
          width: "90px",
          borderRadius: "50%",
          backgroundColor: `${colors.second}`,
          border: "1px solid black",
        }}
      ></div>
      <div
        style={{
          height: "30px",
          width: "30px",
          borderRadius: "50%",
          backgroundColor: `${colors.first}`,
          border: "1px solid black",
          margin: "-35px 67px",
        }}
      >
        <AddIcon />
      </div>
    </div>
  );
};

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
