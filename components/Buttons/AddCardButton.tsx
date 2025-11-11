"use client";

import { Button, useMediaQuery, useTheme } from "@mui/material";
import { Add, AddCard } from "@mui/icons-material";

export default function AddCardButton() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonVariant = isMobile ? "contained" : "outlined";

  const handleAddCardClick = () => {
    console.log("Add Card initiated!");
    alert("New Card Modal Opened!");
  };

  return (
    <Button
      variant={buttonVariant}
      startIcon={<AddCard sx={{ mb: "3px" }} />}
      onClick={handleAddCardClick}
      size={isMobile ? "small" : "medium"}
      aria-label="add new card"
    >
      {isMobile ? "Add" : "Add Card"}
    </Button>
  );
}
