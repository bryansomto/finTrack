"use client";

import { formatCurrency } from "@/lib/utils";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  CircularProgress,
  useTheme,
} from "@mui/material";

interface SavingsCardProps {
  title?: string;
  saved: number; // current saved amount
  goal: number; // savings goal
  accountLabel?: string;
}

export default function SavingsCard({
  title = "Savings Goal",
  saved,
  goal,
  accountLabel = "All accounts",
}: SavingsCardProps) {
  const theme = useTheme();

  const progress = Math.min((saved / goal) * 100, 100); // cap at 100%

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
        {/* Header */}
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

        {/* Circular progress + saved amount */}
        <Box position="relative" display="flex" justifyContent="center" mt={3}>
          <CircularProgress
            variant="determinate"
            value={progress}
            size={120}
            thickness={5}
            sx={{
              color: theme.palette.primary.main,
            }}
          />

          {/* Centered saved amount */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{ transform: "translate(-50%, -50%)" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={700}>
              {formatCurrency(saved)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              of {formatCurrency(goal)}
            </Typography>
          </Box>
        </Box>

        {/* Progress percentage */}
        <Typography
          variant="body2"
          color={progress >= 100 ? "success.main" : "text.secondary"}
          textAlign="center"
          mt={2}
        >
          {progress.toFixed(1)}% of your goal achieved
        </Typography>
      </CardContent>
    </Card>
  );
}
