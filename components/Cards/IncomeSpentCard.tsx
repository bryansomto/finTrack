"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";

interface DailyData {
  day: string;
  netIncome: number;
  outcome: number;
}

interface IncomeSpentCardProps {
  title?: string;
  data: DailyData[];
  accountLabel?: string;
}

export default function IncomeSpentCard({
  title = "Compare Net Income and Spent",
  data,
  accountLabel = "All accounts",
}: IncomeSpentCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const chartSetting = {
    xAxis: [
      {
        data: data.map((d) => d.day),
        scaleType: "band" as const,
      },
    ],
    width: isMobile ? 300 : 500,
    height: 250,
    borderRadius: 8,
  };

  const series = [
    {
      data: data.map((d) => d.netIncome),
      label: "Net Income",
      color: theme.palette.success.main,
    },
    {
      data: data.map((d) => d.outcome),
      label: "Outcome",
      color: "#FF7043",
    },
  ].map((series) => ({
    ...series,
    borderRadius: 8,
  }));

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        backgroundColor: theme.palette.background.default,
        gridColumn: !isMobile ? "span 2" : "auto",
        minWidth: "300px",
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {accountLabel}
        </Typography>

        <Box>
          <BarChart
            {...chartSetting}
            series={series}
            slotProps={{
              legend: { position: { vertical: "top", horizontal: "center" } },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
