import React, { useState } from "react";
import { Box, Typography, Paper, Collapse, Alert } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import { Button } from "styles/Button";

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  resetError?: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  resetError,
}) => {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  const handleReload = () => {
    if (resetError) {
      resetError();
    }
    window.location.reload();
  };

  const handleGoHome = () => {
    if (resetError) {
      resetError();
    }
    router.push("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        padding: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
        }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: 80,
            color: "error.main",
            marginBottom: 2,
          }}
        />

        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Oops! Something went wrong
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          We're sorry, but something unexpected happened. Please try refreshing
          the page or go back to the home page.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3 }}>
          <Button
            element="button"
            active={true}
            icon={<RefreshIcon />}
            onClick={handleReload}
          >
            Reload Page
          </Button>

          <Button
            element="button"
            active={true}
            icon={<HomeIcon />}
            onClick={handleGoHome}
          >
            Go Home
          </Button>
        </Box>

        {process.env.NODE_ENV === "development" && error && (
          <>
            <Button
              element="button"
              active={true}
              icon={<ErrorOutlineIcon />}
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Hide" : "Show"} Error Details
            </Button>

            <Collapse in={showDetails}>
              <Alert severity="error" sx={{ textAlign: "left", mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Error Message:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "monospace", mb: 2 }}
                >
                  {error.message}
                </Typography>

                {error.stack && (
                  <>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      Stack Trace:
                    </Typography>
                    <Typography
                      variant="body2"
                      component="pre"
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "0.75rem",
                        overflow: "auto",
                        maxHeight: 150,
                      }}
                    >
                      {error.stack}
                    </Typography>
                  </>
                )}

                {errorInfo && (
                  <>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold", mb: 1, mt: 2 }}
                    >
                      Component Stack:
                    </Typography>
                    <Typography
                      variant="body2"
                      component="pre"
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "0.75rem",
                        overflow: "auto",
                        maxHeight: 200,
                      }}
                    >
                      {errorInfo.componentStack}
                    </Typography>
                  </>
                )}
              </Alert>
            </Collapse>
          </>
        )}
      </Paper>
    </Box>
  );
};

