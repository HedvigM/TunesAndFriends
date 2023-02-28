import { Typography } from "@mui/material";

export const ProfileInfo = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        margin: "20px",
      }}
    >
      <div
        style={{
          height: "30px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          border: "1px solid black",
        }}
      >
        <div
          style={{
            margin: "-12px",
            backgroundColor: "white",
            height: "fit-content",
            width: "80%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography>Tunes</Typography>
        </div>
      </div>
      <div
        style={{
          height: "30px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          border: "1px solid black",
        }}
      >
        <div
          style={{
            margin: "-12px",
            backgroundColor: "white",
            height: "fit-content",
            width: "80%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography>Following</Typography>
        </div>
      </div>{" "}
      <div
        style={{
          height: "30px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          border: "1px solid black",
        }}
      >
        <div
          style={{
            margin: "-12px",
            backgroundColor: "white",
            height: "fit-content",
            width: "80%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography>folloers</Typography>
        </div>
      </div>
      <div
        style={{
          height: "30px",
          width: "100%",
          backgroundColor: "yellow",
          gridColumnStart: 1,
          gridColumnEnd: 4,
        }}
      >
        4
      </div>
      <div
        style={{
          height: "30px",
          width: "100%",
          backgroundColor: "lime",
          gridColumnStart: 1,
          gridColumnEnd: 4,
        }}
      >
        5
      </div>
    </div>
  );
};
