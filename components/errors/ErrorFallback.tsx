import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "styles/Button";
import { Typography } from "styles/Typography";

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  resetError?: () => void;
}
/* TODO: Add alert */
export function ErrorFallback({
  error,
  /* errorInfo, */
  resetError,
}: ErrorFallbackProps) {
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
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "400px",
      padding: 4,
    }}
    >
      <div

        style={{
          padding: 4,
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 80,
            color: "error.main",
            marginBottom: 2,
          }}
        />

        <Typography variant="h4">
          Oops! Something went wrong
        </Typography>

        <Typography variant="body">
          We're sorry, but something unexpected happened. Please try refreshing
          the page or go back to the home page.
        </Typography>

        <div style={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            element="button"
            active={true}
            /* icon={<RefreshIcon />} */
            onClick={handleReload}
          >
            Reload Page
          </Button>

          <Button
            element="button"
            active={true}
            /* icon={<HomeIcon />} */
            onClick={handleGoHome}
          >
            Go Home
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && error && (
          <>
            <Button
              element="button"
              active={true}
              /* icon={<ErrorOutlineIcon />} */
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Hide" : "Show"} Error Details
            </Button>
         {/*    <div style={{ display: showDetails ? "block" : "none" }}>
              <Alert severity="error" style={{ textAlign: "left" }}>
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
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}

