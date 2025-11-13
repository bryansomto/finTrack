"use client";

import { useMemo } from "react";
// --- Uses relative paths ---
import { formatCurrency } from "../../lib/utils";
import { Transaction, TransactionCategory } from "../../lib/mockData";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";

// Define the colors for each expense category
const CATEGORY_COLORS: Record<string, string> = {
  Utilities: "#FF7043",
  Groceries: "#66BB6A",
  Entertainment: "#7E57C2",
  Rent: "#EC407A",
  Transport: "#5C6BC0",
  Shopping: "#26A69A",
  Other: "#FFA726",
};

// Update the Props to take 'transactions'
interface SpentCardProps {
  title?: string;
  transactions: Transaction[];
  accountLabel?: string;
}

export default function SpentCard({
  title = "Total Spent",
  transactions,
  accountLabel = "All accounts",
}: SpentCardProps) {
  const theme = useTheme();

  // Add Dynamic Calculation Logic
  const { totalSpent, dynamicSpentData } = useMemo(() => {
    let total = 0;

    // Group expenses by category
    const spentByCategory = transactions.reduce((acc, tx) => {
      if (tx.type === "Expense") {
        const amount = Math.abs(tx.amount); //use absolute values
        total += amount;
        const category = tx.category;
        acc[category] = (acc[category] || 0) + amount;
      }
      return acc;
    }, {} as Record<string, number>);

    // Transform data for the UI
    const spentData = Object.entries(spentByCategory)
      .map(([label, value]) => ({
        label,
        value,
        percent: total > 0 ? (value / total) * 100 : 0,
        color:
          CATEGORY_COLORS[label as TransactionCategory] ||
          CATEGORY_COLORS.Other,
      }))
      .sort((a, b) => b.value - a.value); // Sort highest first

    return { totalSpent: total, dynamicSpentData: spentData };
  }, [transactions]);

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        backgroundColor: theme.palette.background.default,
        minWidth: "300px",
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

        <Typography variant="h4" fontWeight={700} mt={2}>
          {formatCurrency(totalSpent)}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>
          {dynamicSpentData.map((item) => (
            <Box key={item.label}>
              <Typography
                variant="body2"
                fontWeight={600}
                color="text.secondary"
              >
                {item.label} — {item.percent.toFixed(0)}%
              </Typography>
              <Box
                sx={{
                  height: 6,
                  borderRadius: 2,
                  bgcolor: `${item.color}40`,
                  mt: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: `${item.percent}%`,
                    height: "100%",
                    bgcolor: item.color,
                    borderRadius: 2,
                  }}
                />
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
