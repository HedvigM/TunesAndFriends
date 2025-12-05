import { LoadingSpinner } from "components/LoadingSpinner";

export default function Loading() {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh" 
    }}>
      <LoadingSpinner size="large" />
    </div>
  );
}

