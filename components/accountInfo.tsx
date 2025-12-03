"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { User } from "@prisma/client";
import { LoadingSpinner } from "components/LoadingSpinner";
import { Typography } from "styles/Typography";

type AccountInfoProps = {
  handleProfileChange: (profileText: string, town: string) => void;
  newProfileText: (profileText: string) => void;
  newTownText: (town: string) => void;
  databaseUser: User;
};

export const AccountInfo = (props: AccountInfoProps) => {
  const { user } = useUser();

  if (user && props.databaseUser) {
    return (
      <div style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "20px 0",
      }}>
      <div style={{
        width: "100%",
        maxWidth: "500px",
        minWidth: "200px",
      }}>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", justifyContent: "space-between"}}>
            <Typography variant="body">First name: </Typography>
            <Typography variant="body">{user.given_name as string}</Typography>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", justifyContent: "space-between"}}>
            <Typography variant="body">Last name: </Typography>
            <Typography variant="body">{user.family_name as string}</Typography>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", justifyContent: "space-between"}}>
            <Typography variant="body">Email: </Typography>
            <Typography variant="body">{user.email}</Typography>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", justifyContent: "space-between"}}>
            <Typography variant="body">Pronouns: </Typography>
            <select /* onChange={(event) => props.newPronounsText(event.target.value)} */>
              <option value="she/her">She/Her</option>
              <option value="he/him">He/Him</option>
              <option value="they/them">They/Them</option>
            </select>
            <Typography variant="body">{user.pronouns as string}</Typography>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", justifyContent: "space-between"}}>
            <Typography variant="body">Town: </Typography>
            <textarea
              placeholder={props.databaseUser.town ? props.databaseUser.town : "Town"}
              rows={1}
              onChange={(event) => props.newTownText(event.target.value)}
            ></textarea>
            <Typography variant="body">{props.databaseUser.profileText}</Typography>
        </div>

          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", justifyContent: "space-between"}}>
          <Typography variant="body">Profile text: </Typography>
            <textarea
              placeholder={props.databaseUser.profileText ? props.databaseUser.profileText : "Profile text"}
              rows={5}
              onChange={(event) => props.newProfileText(event.target.value)}
            ></textarea>
        </div>
      </div>
      </div>
    )
  } else {
    return <LoadingSpinner />;
  }
};
