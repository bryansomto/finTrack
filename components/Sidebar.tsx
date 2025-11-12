"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Home, TrendingUp, Close } from "@mui/icons-material";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VerifiedIcon from "@mui/icons-material/Verified";
import PaymentsIcon from "@mui/icons-material/Payments";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ThemeToggleButton from "./ThemeToggleButton";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const menuItems = [
  { text: "Overview", icon: <Home />, path: "/" },
  { text: "Accounts", icon: <SavingsIcon />, path: "/accounts" },
  { text: "Cards", icon: <CreditCardIcon />, path: "/cards" },
  { text: "Budgets", icon: <TrendingUp />, path: "/budgets" },
  { text: "Goals", icon: <VerifiedIcon />, path: "/goals" },
  { text: "Transactions", icon: <PaymentsIcon />, path: "/transactions" },
];

export default function Sidebar({ open, onClose, onToggle }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) {
      onClose();
    }
  };

  // Desktop fixed sidebar
  if (!isMobile) {
    return (
      <Box
        sx={{
          width: 220,
          flexShrink: 0,
          height: "100vh",
          position: "sticky",
          marginTop: 0.3,
          top: 0,
          left: 0,
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            paddingTop: 2,
            backgroundColor: "background.paper",
            borderRight: `1px solid ${theme.palette.divider}`,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          {/* Menu Items */}
          <List sx={{ px: 1, flex: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 0.5,
                    mb: 0.5,
                    mx: 1.5,
                    "&.Mui-selected": {
                      backgroundColor: "background.paper",
                      boxShadow: 3,
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "background.default",
                      },
                      "& .MuiListItemIcon-root": {
                        color: "inherit",
                      },
                    },
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Footer */}
          <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="body2" color="text.secondary" align="center">
              FinTrack v1.0
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  // Mobile drawer
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 280,
          backgroundColor: "background.paper",
          backgroundImage: "none",
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <MaxWidthWrapper className="h-full flex flex-col">
          {/* Header */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: { xs: 52, sm: 58 },
            }}
          >
            <Typography variant="h6" component="div">
              Fin
              <Box component="span" sx={{ color: "primary.main" }}>
                Track
              </Box>
            </Typography>
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Box>

          <Divider />

          {/* Menu Items */}
          <List sx={{ px: 1, flex: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 0.5,
                    mb: 0.5,
                    mx: 1.5,
                    "&.Mui-selected": {
                      backgroundColor: "background.paper",
                      boxShadow: 3,
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "background.default",
                      },
                      "& .MuiListItemIcon-root": {
                        color: "inherit",
                      },
                    },
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Footer */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <ThemeToggleButton />
            <Typography variant="body2" color="text.secondary">
              FinTrack v1.0
            </Typography>
          </Box>
        </MaxWidthWrapper>
      </Box>
    </Drawer>
  );
}
