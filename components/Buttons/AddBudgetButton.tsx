"use client";

import { Button, useMediaQuery, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function AddBudgetButton() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonVariant = isMobile ? "contained" : "outlined";

  const handleAddBudgetClick = () => {
    console.log("Add Budget initiated!");
    alert("New Budget Modal Opened!");
  };

  return (
    <Button
      variant={buttonVariant}
      startIcon={<Add sx={{ mb: "3px" }} />}
      onClick={handleAddBudgetClick}
      size={isMobile ? "small" : "medium"}
      aria-label="create new budget"
    >
      {isMobile ? "Create" : "Create Budget"}
    </Button>
  );
}
