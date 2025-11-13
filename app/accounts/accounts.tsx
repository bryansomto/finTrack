"use client";

import { customerAccounts } from "@/lib/mockData";
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
        minWidth: 0,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.default,
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: 6,
          },
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: isMobile ? 2 : 3,
        }}
      >
        <Typography variant="h6" fontWeight={500} color="text.secondary">
          Total Cash Balance
        </Typography>

        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
          <Typography
            variant={isMobile ? "h3" : "h2"}
            fontWeight={500}
            color="text.primary"
          >
            {isVisible("totalBalance")
              ? formatCurrency(totalBalance)
              : "₦ • • • • • •"}
          </Typography>
          <IconButton
            size="small"
            sx={{
              mb: !isMobile ? "12px" : "6px",
              color: "text.secondary",
            }}
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
      </Paper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 0,
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
                <MenuItem
                  onClick={() => handleAccountSelection(null)}
                  selected={filters.accountId === "All"}
                >
                  All Accounts
                </MenuItem>
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
                <Typography variant={isMobile ? "h5" : "h4"} fontWeight="600">
                  {isVisible(account.accountNumber)
                    ? formatCurrency(account.balance)
                    : "₦ • • • • • •"}
                </Typography>
                <IconButton
                  size="small"
                  sx={{ mb: "3px", color: "text.secondary" }}
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
      <Stack spacing={3} p={isMobile ? 1 : 3} sx={{ minWidth: 0 }}>
        <TransactionList
          transactions={filteredTransactions}
          onUpdateCategory={handleUpdateCategory}
        />
      </Stack>
    </Box>
  );
}
