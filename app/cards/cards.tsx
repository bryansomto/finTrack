"use client";

import { colorSchemes, customerAccounts } from "@/lib/mockData"; // Make sure this mock data has 'accountNumber'
import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { VisibilityOff } from "@mui/icons-material";
import { formatCurrency } from "@/lib/utils";

type CustomerAccount = {
  bank: string;
  shortName: string;
  accountNumber: number;
  balance: number;
  colorScheme?: keyof typeof colorSchemes;
};

export default function Cards() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const schemeKeys = Object.keys(colorSchemes) as (keyof typeof colorSchemes)[];
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "hidden",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: isMobile ? 1 : 2,
            }}
          >
            <Typography variant={isMobile ? "h5" : "h3"} fontWeight={500}>
              {selectedAccount ? `${selectedAccount.bank}` : "All Cards"}
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
                      selected={
                        selectedAccount?.shortName === account.shortName
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
          <Divider />
        </Box>
        <Box
          sx={{
            // --- MOBILE STYLES ---
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            overflowX: "hidden",
            height: "400px",
            // minHeight: "400px",
            gap: 2,
            pt: 1,
            // --- DESKTOP STYLES (using Grid) ---
            [theme.breakpoints.up("sm")]: {
              display: "grid",
              gridAutoFlow: "column",
              gridAutoColumns: "380px",

              overflowX: "auto",
              scrollSnapType: "x mandatory",
              overflowY: "hidden",
              height: "100%",
              minHeight: "200px",
            },
            // --- General ---
            width: "100%",
            "& > *": {
              flexShrink: 0,
            },
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {filteredAccounts.map((account, Index) => (
            <Card
              key={Index}
              sx={{
                scrollSnapAlign: "start",
                borderRadius: 1,
                background: colorSchemes[schemeKeys[Index % schemeKeys.length]],
                color: "text.tertiary",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardContent
                sx={{
                  p: 2.5,
                  justifyContent: "space-between",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontWeight={600}>Balance</Typography>
                  <Typography variant="h6" fontWeight="400">
                    {account.shortName}
                  </Typography>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 1,
                    }}
                  >
                    <Typography variant={isMobile ? "h4" : "h3"}>
                      {formatCurrency(account.balance)}
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{ color: "text.tertiary", mb: "3px" }}
                    >
                      <VisibilityOff fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="caption">
                    {account.accountNumber}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      bgcolor: "background.paper",
                      color: "text.primary",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      cursor: "pointer",
                    }}
                  >
                    See card details
                  </Typography>

                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      color: "text.primary",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      px: 1,
                      py: 0.3,
                      borderRadius: 0.5,
                    }}
                  >
                    VISA
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
