import React from "react";
import { Box, Skeleton, Stack } from "@mui/material";

interface LoadingSkeletonProps {
  variant?: "page" | "list" | "card" | "minimal";
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = "minimal",
}) => {
  if (variant === "page") {
    return (
      <Box sx={{ padding: 3 }}>
        <Skeleton variant="text" height={60} width="40%" sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
        <Skeleton variant="text" height={40} width="60%" />
        <Skeleton variant="text" height={40} width="80%" />
        <Skeleton variant="text" height={40} width="70%" />
      </Box>
    );
  }

  if (variant === "list") {
    return (
      <Stack spacing={2} sx={{ padding: 2 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Box key={i} sx={{ display: "flex", gap: 2 }}>
            <Skeleton variant="circular" width={50} height={50} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" height={30} width="60%" />
              <Skeleton variant="text" height={20} width="40%" />
            </Box>
          </Box>
        ))}
      </Stack>
    );
  }

  if (variant === "card") {
    return (
      <Box sx={{ padding: 2 }}>
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
        <Skeleton variant="text" height={40} width="80%" />
        <Skeleton variant="text" height={30} width="60%" />
      </Box>
    );
  }

  // Minimal variant
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Stack spacing={2} sx={{ width: "100%", maxWidth: 400 }}>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="text" height={30} />
      </Stack>
    </Box>
  );
};

