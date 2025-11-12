"use client";

import { customerAccounts } from "@/lib/mockData"; // Make sure this mock data has 'accountNumber'
import {
  Autocomplete,
  Box,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { CustomerAccount } from "@/lib/types";
import { useTransactions } from "@/lib/hooks/useTransactions";
import TransactionList from "@/components/Transactions/TransactionList";
import { usePersistentVisibility } from "@/lib/hooks/usePersistentVisibility";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Accounts() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedAccount, setSelectedAccount] =
    useState<CustomerAccount | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const { filteredTransactions, filters, setFilters, handleUpdateCategory } =
    useTransactions();
  const { isVisible, toggleVisibility: toggleBalanceVisibility } =
    usePersistentVisibility("finTrack:visibilityMap", true);

  // --- Handlers for the filter ---
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAccountSelection = (account: CustomerAccount | null) => {
    setSelectedAccount(account);
    setFilters({
      accountId: account ? account.accountNumber : "All",
    });
    handleCloseMenu();
  };

  // --- Props for Autocomplete ---
  const defaultProps = {
    options: customerAccounts,
    getOptionLabel: (option: CustomerAccount) => option.shortName,
  };

  // --- Data Logic ---
  const totalBalance = customerAccounts.reduce(
    (acc, account) => acc + account.balance,
    0
  );

  // If no account is selected, show all. If one is selected, show just that one.
  const filteredAccounts = selectedAccount
    ? [selectedAccount]
    : customerAccounts;

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        p: isMobile ? 1 : 3,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          background: "linear-gradient(135deg, #007F5F 0%, #00A87C 100%)",
          color: theme.palette.primary.contrastText, // Set text color to white
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: 6,
          },
          minWidth: "240px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: isMobile ? 2 : 3,
            height: "160px",
            color: "primary.contrastText",
          }}
        >
          <Typography variant="h6" fontWeight={300}>
            Total Cash Balance
          </Typography>
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
            <Typography variant={isMobile ? "h3" : "h2"} fontWeight={500}>
              {isVisible("totalBalance")
                ? formatCurrency(totalBalance)
                : "₦ • • • • • •"}
            </Typography>
            <IconButton
              size="small"
              sx={{ mb: "3px" }}
              onClick={() => toggleBalanceVisibility("totalBalance")}
              aria-label={
                isVisible("totalBalance") ? "Hide balance" : "Show balance"
              }
            >
              {isVisible("totalBalance") ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </Box>
        </Box>
      </Paper>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: isMobile ? 1 : 2,
          }}
        >
          <Typography variant={isMobile ? "h4" : "h3"}>
            Linked Accounts
          </Typography>

          {isMobile ? (
            <>
              <IconButton onClick={handleOpenMenu} color="inherit">
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleCloseMenu}
              >
                {/* "All" Option */}
                <MenuItem
                  onClick={() => handleAccountSelection(null)}
                  selected={filters.accountId === "All"}
                >
                  All Accounts
                </MenuItem>
                {/* Account Options */}
                {customerAccounts.map((account) => (
                  <MenuItem
                    key={account.shortName}
                    onClick={() => handleAccountSelection(account)}
                    selected={
                      filters.accountId !== "All" &&
                      filters.accountId === account.accountNumber
                    }
                  >
                    {account.shortName} ({account.bank})
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Autocomplete
              {...defaultProps}
              id="auto-complete"
              autoComplete
              includeInputInList
              value={selectedAccount}
              onChange={(event, newValue: CustomerAccount | null) => {
                handleAccountSelection(newValue);
              }}
              sx={{ minWidth: 200 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Filter by account"
                  variant="standard"
                />
              )}
            />
          )}
        </Box>

        {filteredAccounts.map((account, Index) => (
          <Paper
            elevation={2}
            sx={{
              width: "100%",
              minWidth: "240px",
              backgroundColor: theme.palette.background.default,
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": {
                boxShadow: 6,
              },
            }}
            key={Index}
          >
            <Box sx={{ p: isMobile ? 2 : 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: isMobile ? 1 : 2,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    fontWeight={isMobile ? "300" : "400"}
                    color="text.secondary"
                  >
                    {account.bank}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={isMobile ? "300" : "400"}
                  >
                    {account.accountNumber}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  px: isMobile ? 1 : 2,
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 1,
                }}
              >
                {/* 1. Check visibility using the account.accountNumber ID */}
                <Typography variant={isMobile ? "h5" : "h4"} fontWeight="600">
                  {isVisible(account.accountNumber)
                    ? formatCurrency(account.balance)
                    : "₦ • • • • • •"}
                </Typography>

                {/* 2. Toggle visibility using the account.accountNumber ID */}
                <IconButton
                  size="small"
                  sx={{ mb: "3px" }}
                  onClick={() => toggleBalanceVisibility(account.accountNumber)}
                  aria-label={
                    isVisible(account.accountNumber)
                      ? "Hide balance"
                      : "Show balance"
                  }
                >
                  {isVisible(account.accountNumber) ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
      <Stack spacing={3} p={isMobile ? 1 : 3}>
        <TransactionList
          transactions={filteredTransactions}
          onUpdateCategory={handleUpdateCategory}
        />
      </Stack>
    </Box>
  );
}
