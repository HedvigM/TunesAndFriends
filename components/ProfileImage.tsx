import { theme } from "styles/theme";
import AddIcon from "@mui/icons-material/Add";

export const ProfileImage = () => {
  return (
    <div>
      <div
        style={{
          height: "130px",
          width: "130px",
          borderRadius: "50%",
          backgroundColor: `${theme.palette.primary.second}`,
          border: "1px solid black",
        }}
      ></div>
      <div
        style={{
          height: "30px",
          width: "30px",
          borderRadius: "50%",
          backgroundColor: `${theme.palette.primary.first}`,
          border: "1px solid black",
          margin: "-39px 100px",
        }}
      >
        <AddIcon />
      </div>
    </div>
  );
};
