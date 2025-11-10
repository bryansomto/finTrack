"use client";

import BalanceCard from "@/components/Cards/BalanceCard";
import GoalsCard from "@/components/Cards/GoalsCard";
import IncomeCard from "@/components/Cards/IncomeCard";
import IncomeSpentCard from "@/components/Cards/IncomeSpentCard";
import SavingsCard from "@/components/Cards/SavingsCard";
import SpentCard from "@/components/Cards/SpentCard";
import {
  financialGoals,
  incomeData,
  spentData,
  weeklyData,
} from "@/lib/mockData";
import { Box, useMediaQuery, useTheme } from "@mui/material";

export default function Overview() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
      gap={3}
      p={isMobile ? 1 : 3}
    >
      <IncomeCard total={132142} data={incomeData} />
      <SpentCard total={30671} data={spentData} />
      <BalanceCard cardNo={3} />
      <IncomeSpentCard data={weeklyData} />
      <GoalsCard goals={financialGoals} />
      <SavingsCard saved={20886} goal={30671} />
    </Box>
  );
}
