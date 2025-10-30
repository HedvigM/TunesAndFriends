import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { Box, Container, Typography } from "@mui/material";
import { Header } from "components/Header";
import { Menu } from "components/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import { Button } from "styles/Button";
interface PageErrorBoundaryProps {
  children: React.ReactNode;
}

const PageErrorFallback: React.FC = () => {
  const router = useRouter();

  return (
    <Container>
      <Header size="large" textAlign="center">
        Tunes & Friends
      </Header>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          padding: 4,
        }}
      >
        <Typography variant="h3" gutterBottom>
          😔 Page Error
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          This page encountered an error. Please try going back to the home
          page.
        </Typography>

        <Button
          element="button"
          active={true}
          icon={<HomeIcon />}
          onClick={() => router.push("/")}
        >
          Go to Home
        </Button>
      </Box>

      <Menu title="T&F" />
    </Container>
  );
};

export const PageErrorBoundary: React.FC<PageErrorBoundaryProps> = ({
  children,
}) => {
  return (
    <ErrorBoundary fallback={<PageErrorFallback />}>{children}</ErrorBoundary>
  );
};

