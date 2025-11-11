"use client";

import { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Box,
} from "@mui/material";
import {
  Transaction,
  getCategoryIcon,
  transactionCategories,
  TransactionCategory,
} from "@/lib/mockData";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { formatCurrency } from "@/lib/utils";

interface ItemProps {
  transaction: Transaction;
  onUpdateCategory: (txId: string, newCategory: TransactionCategory) => void;
}

export default function TransactionItem({
  transaction,
  onUpdateCategory,
}: ItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const isIncome = transaction.type === "Income";
  const amountColor = isIncome ? "success.main" : "text.primary";

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Stop click from bubbling to the ListItem
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (category: TransactionCategory) => {
    onUpdateCategory(transaction.id, category);
    handleCloseMenu();
  };

  const handleItemClick = () => {
    // This is for the ">" details click
    alert(`Opening details for ${transaction.name}`);
  };

  return (
    <>
      <ListItem
        onClick={handleItemClick}
        secondaryAction={
          <IconButton edge="end" aria-label="details">
            <ChevronRight />
          </IconButton>
        }
        sx={{
          "&:hover": {
            backgroundColor: "action.hover",
          },
          cursor: "pointer",
        }}
      >
        <ListItemAvatar>
          <Avatar>{getCategoryIcon(transaction.category)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={transaction.name}
          secondary={
            <Chip
              label={transaction.category}
              size="small"
              onClick={handleOpenMenu}
              aria-controls={isMenuOpen ? "category-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={isMenuOpen ? "true" : undefined}
              sx={{ cursor: "pointer" }}
            />
          }
          slotProps={{
            secondary: {
              component: "div",
            },
          }}
        />
        <Box sx={{ textAlign: "right", mr: 4 }}>
          <Typography variant="body1" fontWeight={600} color={amountColor}>
            {isIncome && "+"}
            {formatCurrency(transaction.amount)}
          </Typography>
        </Box>
      </ListItem>

      {/* The Menu for changing category */}
      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
      >
        {transactionCategories
          .filter((cat) => cat !== "Income") // Can't recategorize to Income
          .map((category) => (
            <MenuItem
              key={category}
              onClick={() => handleCategorySelect(category)}
              selected={category === transaction.category}
            >
              {category}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}
