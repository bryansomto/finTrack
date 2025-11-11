"use client";

import { Button, useMediaQuery, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function AddTransactionButton() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonVariant = isMobile ? "contained" : "outlined";

  const handleAddTransactionClick = () => {
    console.log("Add Transaction initiated!");
    alert("New Transaction Modal Opened!");
  };

  return (
    <Button
      variant={buttonVariant}
      startIcon={<Add sx={{ mb: "3px" }} />}
      onClick={handleAddTransactionClick}
      size={isMobile ? "small" : "medium"}
      aria-label="add new transaction"
    >
      {isMobile ? "Add" : "Add Transaction"}
    </Button>
  );
}
