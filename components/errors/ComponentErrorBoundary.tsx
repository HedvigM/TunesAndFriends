import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { Box, Typography, Alert, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface ComponentErrorBoundaryProps {
  children: React.ReactNode;
  componentName?: string;
  resetKeys?: Array<string | number>;
}

const ComponentErrorFallback: React.FC<{
  componentName?: string;
  resetError?: () => void;
}> = ({ componentName, resetError }) => {
  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "150px",
      }}
    >
      <Alert
        severity="error"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          {componentName ? `${componentName} Error` : "Component Error"}
        </Typography>
        <Typography variant="body2">
          This section encountered an error. Please try refreshing.
        </Typography>

        {resetError && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={resetError}
            sx={{ mt: 1, alignSelf: "flex-start" }}
          >
            Retry
          </Button>
        )}
      </Alert>
    </Box>
  );
};

export const ComponentErrorBoundary: React.FC<ComponentErrorBoundaryProps> = ({
  children,
  componentName,
  resetKeys,
}) => {
  return (
    <ErrorBoundary
      fallback={<ComponentErrorFallback componentName={componentName} />}
      resetKeys={resetKeys}
    >
      {children}
    </ErrorBoundary>
  );
};

