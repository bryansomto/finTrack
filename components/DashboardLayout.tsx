"use client";

import { Box, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const pageTitle = useMemo(() => {
    if (pathname === "/dashboard" || pathname === "/") return "Overview";

    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    return lastSegment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }, [pathname]);

  return (
    <MaxWidthWrapper>
      {/* Navbar */}
      <Navbar onMenuToggle={handleSidebarToggle} />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Fixed Sidebar for desktop */}
        {!isMobile && (
          <Sidebar
            open={false}
            onClose={() => {}}
            onToggle={handleSidebarToggle}
          />
        )}
        {/* Mobile Sidebar */}
        {isMobile && (
          <Sidebar
            open={sidebarOpen}
            onClose={handleSidebarClose}
            onToggle={handleSidebarToggle}
          />
        )}

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {/* Page content */}
          <Box
            sx={{
              flexGrow: 1,
              p: { xs: 2, sm: 0 },
              backgroundColor: theme.palette.background.paper,
              marginTop: 0.3,
              marginLeft: 0.3,
              borderTop: `1px solid ${theme.palette.divider}`,
              borderLeft: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                ml: isMobile ? 1 : 3,
                mt: 3,
              }}
              gutterBottom
            >
              {pageTitle}
            </Typography>
            {children}
          </Box>
        </Box>
      </Box>
    </MaxWidthWrapper>
  );
}
