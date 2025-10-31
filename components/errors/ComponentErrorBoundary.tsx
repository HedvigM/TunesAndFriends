import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";
/* import { Button } from "styles/Button";
import { Typography } from "styles/Typography"; */

interface ComponentErrorBoundaryProps {
  children: React.ReactNode;
  componentName?: string;
  resetKeys?: Array<string | number>;
}

const ComponentErrorFallback: React.FC<{
  componentName?: string;
  resetError?: () => void;
}> = (/* { componentName, resetError } */) => {
  return (
    <div style={{
      padding: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "150px",
    }}>
 {/*      <Alert
        severity="error"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="body">
          {componentName ? `${componentName} Error` : "Component Error"}
        </Typography>
        <Typography variant="body">
          This section encountered an error. Please try refreshing.
        </Typography>

        {resetError && (
          <Button
            element="button"
            active={true}
            icon={<RefreshIcon />}
            onClick={resetError}
          >
            Retry
          </Button>
        )}
      </Alert> */}
    </div>
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

