import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { getOrCreateUser } from "lib/api";
import { Typography } from "styles/Typography";
import { Header } from "./Header";

export const Menu = (props: { title: string }) => {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (typeof user !== "undefined" && isLoading === false && user) {
      getOrCreateUser(user).then((result) => {
        if (!result.success) {
          console.error("Failed to get/create user in Menu:", result.error);
        }
      });
    }
  }, [user, isLoading]);

  return (

      <div style={{ display: "flex", gap: "20px", alignItems: "center", margin: "10px" }}>
          {props.title !== "T&F" && (
            <div style={{width: "50px"}}>

                    <Header textAlign="left" size="small">
                        T&F
                    </Header>
            </div>
                    )}
          <Link href="/">
            <Typography
              variant="body"
            >
              Home
            </Typography>
          </Link>

          <Link href="/friends">
            <Typography
              variant="body"
            >
              Friends
            </Typography>
          </Link>


          <Link href="/tunes">
            <Typography
              variant="body"
            >
              Tunes
            </Typography>
          </Link>

          <Link href="/myTunes">
            <Typography
              variant="body"
            >
              My tunes
            </Typography>
          </Link>

        {user && user.sub !== undefined && (
            <Link
              href={{
                pathname: "/friend/[slug]",
                query: { slug: `${user.sub}` },
              }}
              >
            <Typography
              variant="body"
              >
              My profile
            </Typography>
          </Link>
            )}
      </div>
  );
};
