"use client";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { getOrCreateUser } from "lib/api";
import { Header } from "./Header";
import styles from "styles/Typography.module.scss";

export const Menu = (props: { title: string }) => {
  const { user, isLoading } = useUser();

  useEffect(() => {
    let isMounted = true;

    if (typeof user !== "undefined" && isLoading === false && user) {
      getOrCreateUser(user)
        .then((result) => {
          if (isMounted && !result.success) {
            console.error("Failed to get/create user in Menu:", result.error);
          }
        })
        .catch((error) => {
          if (isMounted) {
            console.error("Unexpected error in Menu:", error);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [user, isLoading]);

/* TODO: ändra till små bokstäver */

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
            <p className={styles.bodyLink}>
              Home
            </p>
          </Link>

          <Link href="/friends" style={{ textDecoration: "none" }}>
            <p className={styles.bodyLink}>
              Friends
            </p>
          </Link>

          <Link href="/tunes" style={{ textDecoration: "none" }}>
            <p className={styles.bodyLink}>
              Tunes
            </p>
          </Link>

          <Link href="/my-tunes" style={{ textDecoration: "none" }}>
            <p className={styles.bodyLink}>
              My tunes
            </p>
          </Link>

        {user && user.sub !== undefined && (
            <Link
              href={`/my-profile`}
              style={{ textDecoration: "none" }}
            >
              <p className={styles.bodyLink}>
                My profile
              </p>
            </Link>
        )}
      </div>
  );
};
