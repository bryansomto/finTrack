"use client";

import { Button, useMediaQuery, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function AddAccountButton() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonVariant = isMobile ? "contained" : "outlined";

  const handleAddAccountClick = () => {
    console.log("Add Account initiated!");
    alert("New Account Modal Opened!");
  };

  return (
    <Button
      variant={buttonVariant}
      startIcon={<Add sx={{ mb: "3px" }} />}
      onClick={handleAddAccountClick}
      size={isMobile ? "small" : "medium"}
      aria-label="add new account"
    >
      {isMobile ? "Add" : "Add Account"}
    </Button>
  );
}
