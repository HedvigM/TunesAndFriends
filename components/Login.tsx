import Link from "next/link";
import styles from "styles/Typography.module.scss";

export const Login = () => {
  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "var(--color-secondary)" }}>
      <Link href="/api/auth/login">
            <h1 className={styles.loginButton}>
              LOG IN
            </h1>
      </Link>
    </div>
  );
};
