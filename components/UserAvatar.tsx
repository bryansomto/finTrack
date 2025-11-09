"use client";

import { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import {
  AccountCircle,
  Settings,
  ExitToApp,
  Person,
} from "@mui/icons-material";

interface UserAvatarProps {
  size?: number;
  showMenu?: boolean;
}

export default function UserAvatar({
  size = 36,
  showMenu = true,
}: UserAvatarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (showMenu) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    console.log("Navigate to profile");
    handleClose();
  };

  const handleSettings = () => {
    console.log("Navigate to settings");
    handleClose();
  };

  const handleLogout = () => {
    console.log("Logout user");
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          padding: 0.5,
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <Avatar
          sx={{
            width: size,
            height: size,
            bgcolor: "primary.main",
            border: `2px solid`,
            borderColor: "primary.light",
            cursor: showMenu ? "pointer" : "default",
            "&:hover": showMenu
              ? {
                  transform: "scale(1.05)",
                  transition: "transform 0.2s ease-in-out",
                }
              : {},
          }}
        >
          <Person sx={{ fontSize: size * 0.5 }} />
        </Avatar>
      </IconButton>

      {showMenu && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1,
              minWidth: 160,
              borderRadius: 1,
            },
          }}
        >
          {/* Compact User Info Section */}
          <Box sx={{ px: 1.5, py: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold" noWrap>
              John Doe
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              john.doe@example.com
            </Typography>
          </Box>

          <Divider sx={{ my: 0.5 }} />

          {/* Compact Menu Items */}
          <MenuItem
            onClick={handleProfile}
            sx={{ py: 0.75, minHeight: "auto" }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <AccountCircle fontSize="small" sx={{ fontSize: "1rem" }} />
            </ListItemIcon>
            <ListItemText
              primary="Profile"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>

          <MenuItem
            onClick={handleSettings}
            sx={{ py: 0.75, minHeight: "auto" }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Settings fontSize="small" sx={{ fontSize: "1rem" }} />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>

          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={handleLogout} sx={{ py: 0.75, minHeight: "auto" }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ExitToApp fontSize="small" sx={{ fontSize: "1rem" }} />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        </Menu>
      )}
    </>
  );
}
