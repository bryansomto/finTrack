"use client";

import { useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import { Transaction } from "@/lib/mockData";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";

const CATEGORY_COLORS: Record<string, string> = {
  Salary: "#3EC7E0",
  Selling: "#8FE388",
  Donation: "#C3E7E3",
  Other: "#BDBDBD",
};

interface DynamicIncomeCardProps {
  title?: string;
  transactions: Transaction[];
  accountLabel?: string;
}

export default function IncomeCard({
  title = "Total Income",
  transactions,
  accountLabel = "All accounts",
}: DynamicIncomeCardProps) {
  const theme = useTheme();
  const isBelowLG = useMediaQuery(theme.breakpoints.down("lg"));

  // --- DYNAMIC INCOME DATA CALCULATION ---
  const { totalIncome, pieChartData } = useMemo(() => {
    let total = 0;

    // Group all income transactions by category
    const incomeByCategory = transactions.reduce((acc, tx) => {
      if (tx.type === "Income") {
        total += tx.amount;
        const category = tx.category;
        acc[category] = (acc[category] || 0) + tx.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    // Transform the grouped data into PieChart format
    const chartData = Object.entries(incomeByCategory).map(
      ([label, value], id) => ({
        id: id,
        value: value,
        label: label,
        color: CATEGORY_COLORS[label] || CATEGORY_COLORS.Other,
      })
    );

    return { totalIncome: total, pieChartData: chartData };
  }, [transactions]);

  // Find top category from the *new* dynamic data
  const topCategory = pieChartData.reduce(
    (prev, curr) => (curr.value > prev.value ? curr : prev),
    pieChartData[0] || null // Handle empty data
  );

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

        <Box position="relative" display="flex" justifyContent="center" mt={3}>
          <PieChart
            width={200}
            height={180}
            series={[
              {
                data: pieChartData,
                innerRadius: 65,
                outerRadius: 80,
              },
            ]}
            slotProps={{
              legend: {
                direction: "horizontal",
                position: { vertical: "bottom", horizontal: "center" },
              },
            }}
          />

          <Box
            position="absolute"
            top={isBelowLG ? "50%" : "40%"}
            left="50%"
            sx={{ transform: "translate(-50%, -50%)" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h5" fontWeight={700}>
              {formatCurrency(totalIncome)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total
            </Typography>
          </Box>
        </Box>

        {topCategory && (
          <Typography
            variant="body2"
            color="text.secondary"
            mt={2}
            textAlign="center"
          >
            Top category: {topCategory.label} (
            {formatCurrency(topCategory.value)})
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
