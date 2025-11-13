"use client";

import { useCallback, useMemo, useState } from "react";
import { Typography, Stack, useTheme, useMediaQuery } from "@mui/material";
import { mockTransactions, mockBudgets } from "@/lib/mockData";
import TotalSpendingCard from "@/components/Budgets/TotalSpendingCard";
import BudgetCategoryItem from "@/components/Budgets/BudgetCategoryItem";

// Helper to format "2025-11" to "November 2025"
const formatMonth = (monthStr: string) => {
  const [year, month] = monthStr.split("-");
  return new Date(parseInt(year), parseInt(month) - 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
};

export default function Budgets() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedMonth, setSelectedMonth] = useState("2025-11");

  const availableMonths = useMemo(() => {
    // Get unique "YYYY-MM" strings from all budgets
    const months = [...new Set(mockBudgets.map((b) => b.month))];
    // Sort them descending (most recent first)
    months.sort((a, b) => b.localeCompare(a));
    return months;
  }, []);

  // Get only the budgets for the selected month
  const filteredBudgets = useMemo(() => {
    return mockBudgets.filter((b) => b.month === selectedMonth);
  }, [selectedMonth]);

  // Calculate total spending for *each category*
  const spendingByCategory = useMemo(() => {
    return mockTransactions.reduce((acc, tx) => {
      // Check if transaction is in the selected month
      const txMonth = tx.date.substring(0, 7); // "YYYY-MM"
      if (tx.type === "Expense" && txMonth === selectedMonth) {
        const category = tx.category;
        const amount = Math.abs(tx.amount);
        acc[category] = (acc[category] || 0) + amount;
      }
      return acc;
    }, {} as Record<string, number>);
  }, [selectedMonth]);

  // Calculate total spending for the *entire month*
  const totalSpending = useMemo(() => {
    return Object.values(spendingByCategory).reduce(
      (sum, amount) => sum + amount,
      0
    );
  }, [spendingByCategory]);

  // Calculate the total budgeted amount
  const totalBudget = useMemo(() => {
    return filteredBudgets.reduce((sum, budget) => sum + budget.limit, 0);
  }, [filteredBudgets]);

  const handleMonthChange = useCallback((newMonth: string) => {
    setSelectedMonth(newMonth);
  }, []);

  return (
    <Stack spacing={3} p={isMobile ? 1 : 3} minWidth={0}>
      <TotalSpendingCard
        totalSpent={totalSpending}
        totalBudget={totalBudget}
        selectedMonth={selectedMonth}
        availableMonths={availableMonths}
        onMonthChange={handleMonthChange}
        formatMonth={formatMonth}
      />
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={500}>
          Active Budgets ({filteredBudgets.length})
        </Typography>
        {filteredBudgets.map((budget) => (
          <BudgetCategoryItem
            key={budget.id}
            category={budget.category}
            limit={budget.limit}
            spent={spendingByCategory[budget.category] || 0}
          />
        ))}
      </Stack>
    </Stack>
  );
}
