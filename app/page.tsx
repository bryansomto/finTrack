"use client";

import BalanceCard from "@/components/Cards/BalanceCard";
import GoalsCard from "@/components/Cards/GoalsCard";
import IncomeCard from "@/components/Cards/IncomeCard";
import IncomeSpentCard from "@/components/Cards/IncomeSpentCard";
import SpentCard from "@/components/Cards/SpentCard";
import DashboardLayout from "@/components/DashboardLayout";
import {
  mockTransactions,
  weeklyData,
  mockGoals,
  customerAccounts,
} from "@/lib/mockData";
import { Box, useMediaQuery, useTheme } from "@mui/material";

export default function Overview() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const totalSpent = 30671;
  const totalSavings = 20886;

  return (
    <DashboardLayout>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
        gap={3}
        p={isMobile ? 1 : 3}
      >
        <IncomeCard transactions={mockTransactions} />
        <SpentCard transactions={mockTransactions} />
        <BalanceCard cards={customerAccounts} />
        <IncomeSpentCard data={weeklyData} />
        <GoalsCard goals={mockGoals} />
      </Box>
    </DashboardLayout>
  );
}
