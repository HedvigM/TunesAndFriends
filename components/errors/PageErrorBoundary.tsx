import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { Header } from "components/Header";
import { Menu } from "components/Menu";
import { useRouter } from "next/router";
import { Button } from "styles/Button";
import { Typography } from "styles/Typography";
interface PageErrorBoundaryProps {
  children: React.ReactNode;
}

const PageErrorFallback: React.FC = () => {
  const router = useRouter();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      textAlign: "center",
      padding: 4,
      gap: "20px",
    }}>
      <Header size="large" textAlign="center">
        Tunes & Friends
      </Header>

      <div style={{
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         justifyContent: "center",
         minHeight: "60vh",
         textAlign: "center",
         padding: 4,
      }}
      >
        <Typography variant="h3">
          😔 Page Error
        </Typography>

        <Typography variant="body" color="black">
          This page encountered an error. Please try going back to the home
          page.
        </Typography>

        <Button
          element="button"
          active={true}
          onClick={() => router.push("/")}
        >
          Go to Home
        </Button>
      </div>

      <Menu title="T&F" />
    </div>
  );
};

export const PageErrorBoundary: React.FC<PageErrorBoundaryProps> = ({
  children,
}) => {
  return (
    <ErrorBoundary fallback={<PageErrorFallback />}>{children}</ErrorBoundary>
  );
};

