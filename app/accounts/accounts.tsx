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
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";

type CustomerAccount = {
  bank: string;
  shortName: string;
  accountNumber: number;
  balance: number;
};

export default function Accounts() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedAccount, setSelectedAccount] =
    useState<CustomerAccount | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  // --- Handlers for the filter ---
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectAccount = (account: CustomerAccount | null) => {
    setSelectedAccount(account);
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
        }}
      >
        <Box sx={{ p: isMobile ? 2 : 3 }}>
          <Typography variant="h5" fontWeight={400}>
            Total Cash Balance
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant={isMobile ? "h3" : "h2"} fontWeight={500}>
              {formatCurrency(totalBalance)}
            </Typography>
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
                  onClick={() => handleSelectAccount(null)}
                  selected={selectedAccount === null}
                >
                  All Accounts
                </MenuItem>
                {/* Account Options */}
                {customerAccounts.map((account) => (
                  <MenuItem
                    key={account.shortName}
                    onClick={() => handleSelectAccount(account)}
                    selected={selectedAccount?.shortName === account.shortName}
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
                setSelectedAccount(newValue);
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
                    fontWeight={isMobile ? "400" : "500"}
                    color="text.secondary"
                  >
                    {account.bank}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {account.accountNumber}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ px: isMobile ? 1 : 2 }}>
                <Typography variant={isMobile ? "h5" : "h4"} fontWeight="600">
                  {formatCurrency(account.balance)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
