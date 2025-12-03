import Link from "next/link";
import { Typography } from "styles/Typography";
import { Button } from "styles/Button";

export default function NotFound() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "2rem",
      textAlign: "center",
    }}>
      <div style={{ marginBottom: "1rem" }}>
        <Typography variant="h1">
          404
        </Typography>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <Typography variant="h4">
          Page Not Found
        </Typography>
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <Typography variant="body">
          The page you are looking for does not exist.
        </Typography>
      </div>
      <Link href="/">
        <Button element="button" active={true}>
          Go Home
        </Button>
      </Link>
    </div>
  );
}

