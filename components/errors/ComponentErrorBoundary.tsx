import type { ReactNode } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
/* import { Button } from "styles/Button";
import { Typography } from "styles/Typography"; */

interface ComponentErrorBoundaryProps {
  children: ReactNode;
  componentName?: string;
  resetKeys?: Array<string | number>;
}

function ComponentErrorFallback() {
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
}

export function ComponentErrorBoundary({
  children,
  componentName: _componentName,
  resetKeys,
}: ComponentErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={<ComponentErrorFallback />}
      resetKeys={resetKeys}
    >
      {children}
    </ErrorBoundary>
  );
}

