"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { Header } from "./Header";
import styles from "styles/Typography.module.scss";

export const Menu = (props: { title: string }) => {
  const { user } = useUser();


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
              href={`/settings`}
              style={{ textDecoration: "none" }}
            >
              <p className={styles.bodyLink}>
                Settings
              </p>
            </Link>
        )}
      </div>
  );
};
