"use client";

import { Button, useMediaQuery, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function AddGoalButton() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonVariant = isMobile ? "contained" : "outlined";

  const handleAddGoalClick = () => {
    console.log("Add Goal initiated!");
    alert("New Goal Modal Opened!");
  };

  return (
    <Button
      variant={buttonVariant}
      startIcon={<Add sx={{ mb: "3px" }} />}
      onClick={handleAddGoalClick}
      size={isMobile ? "small" : "medium"}
      aria-label="New goal"
    >
      {isMobile ? "New" : "New Goal"}
    </Button>
  );
}
