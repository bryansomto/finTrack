"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { formatCurrency } from "@/lib/utils";
import { colorSchemes, customerAccounts } from "@/lib/mockData";
import { usePersistentVisibility } from "@/lib/hooks/usePersistentVisibility";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface BalanceCardProps {
  title?: string;
  balance?: number | string;
  cardDetails?: string;
  showAllCards?: boolean;
  variant?: "default" | "compact";
  colorScheme?: keyof typeof colorSchemes;
  accountLabel?: string;
  cards: customerAccounts[];
}

export default function BalanceCard({
  title = "Cards",
  cardDetails = "See card details",
  accountLabel = "All accounts",
  cards,
}: BalanceCardProps) {
  const theme = useTheme();
  const schemeKeys = Object.keys(colorSchemes) as (keyof typeof colorSchemes)[];
  const { isVisible, toggleVisibility: toggleBalanceVisibility } =
    usePersistentVisibility("finTrack:visibilityMap", true);

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {accountLabel}
          </Typography>
        </Stack>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "280px",
            "& > *": {
              flexShrink: 0,
            },
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {cards.map((account, Index) => (
            <Box
              key={Index}
              sx={{
                borderRadius: 1,
                p: 2,
                background: colorSchemes[schemeKeys[Index % schemeKeys.length]],
                color: "text.tertiary",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                minWidth: 200,
                boxShadow: 3,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" fontWeight="500">
                  Balance
                </Typography>
                <Typography variant="body1" fontWeight="400">
                  {account.shortName}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 1,
                }}
              >
                <Typography variant="h5">
                  {isVisible(account.accountNumber)
                    ? formatCurrency(account.balance)
                    : "₦ • • • • • •"}
                </Typography>
                <IconButton
                  size="small"
                  sx={{ color: "text.tertiary" }}
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

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    bgcolor: "background.paper",
                    color: "text.primary",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    cursor: "pointer",
                  }}
                >
                  {cardDetails}
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
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
