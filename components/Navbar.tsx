"use client";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ThemeToggleButton from "./ThemeToggleButton";
import UserAvatar from "./UserAvatar";
import { useMediaQuery, useTheme } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(0, 2),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.75, 1, 0.75, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3.5)})`,
    fontSize: "0.875rem",
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      fontSize: "1rem",
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar
        position="static"
        elevation={1}
        sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: { xs: "0px", sm: "10px 10px 0 0" },
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: 0,
        })}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            minHeight: { xs: 50, sm: 56 },
          }}
        >
          {/* Left section - Logo and mobile menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 1 }}
                onClick={onMenuToggle}
              >
                <MenuIcon sx={{ color: "primary.main", fontSize: "1.25rem" }} />
              </IconButton>
            )}

            <Typography
              variant="h6"
              sx={{
                ml: isMobile ? 0 : 3,
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              }}
            >
              Fin
              <Box component="span" sx={{ color: "primary.main" }}>
                Track
              </Box>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Search
              sx={{
                marginRight: 0,
                width: { xs: "120px", sm: "auto" },
              }}
            >
              <SearchIconWrapper>
                <SearchIcon
                  sx={{
                    color: "primary.main",
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            {/* User Avatar - visible on both mobile and desktop */}
            <UserAvatar size={isMobile ? 28 : 32} />

            {/* Theme toggle button visible only on desktop */}
            {!isMobile && <ThemeToggleButton />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
