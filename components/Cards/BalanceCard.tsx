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

const colorSchemes = {
  purple: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  blue: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  green: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  orange: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
};

interface BalanceCardProps {
  title?: string;
  balance: number | string;
  cardDetails?: string;
  showAllCards?: boolean;
  variant?: "default" | "compact";
  colorScheme?: keyof typeof colorSchemes;
  accountLabel?: string;
}

export default function BalanceCard({
  title = "Cards",
  balance = "$2301",
  cardDetails = "See card details",
  showAllCards = true,
  variant = "default",
  colorScheme = "purple",
  accountLabel = "All accounts",
}: BalanceCardProps) {
  const theme = useTheme();
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
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            overflow: "visible",
          }}
        >
          <Box
            sx={{
              borderRadius: 1,
              p: 2.5,
              background: colorSchemes[colorScheme],
              color: "text.tertiary",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "98%",
              minWidth: 230,
              boxShadow: 3,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontWeight={600}>Balance</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
              }}
            >
              <Typography variant="h5" fontWeight="600">
                ₦{balance}
              </Typography>
              <IconButton size="small" sx={{ color: "text.tertiary" }}>
                <VisibilityOffIcon fontSize="small" />
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
                variant="body2"
                sx={{
                  bgcolor: "rgba(255,255,255,0.8)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  cursor: "pointer",
                  color: "text.tertiary",
                }}
              >
                See card details
              </Typography>

              <Box
                sx={{
                  bgcolor: "black",
                  color: "white",
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
        </Box>
      </CardContent>
    </Card>
  );
}
