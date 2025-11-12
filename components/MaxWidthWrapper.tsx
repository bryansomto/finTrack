"use client";

import { cn } from "@/lib/utils";
import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      className={cn("h-full mx-auto w-full max-w-6xl", className)}
      sx={{
        backgroundColor: theme.palette.background.default,
        boxShadow: isDarkMode ? 4 : 1,
        transition: "background-color 0.3s ease",
      }}
    >
      {children}
    </Box>
  );
};

export default MaxWidthWrapper;
