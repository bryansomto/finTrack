"use client";

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

type IncomeData = {
  id: number;
  value: number;
  label: string;
  color: string;
};

interface IncomeCardProps {
  title?: string;
  total: number;
  data: IncomeData[];
  accountLabel?: string;
}

export default function IncomeCard({
  title = "Total Income",
  total,
  data,
  accountLabel = "All accounts",
}: IncomeCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.down("md"));
  const isLgDesktop = useMediaQuery(theme.breakpoints.down("lg"));

  // Find top category
  const topCategory = data.reduce((prev, curr) =>
    curr.value > prev.value ? curr : prev
  );
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

        <Box position="relative" display="flex" justifyContent="center" mt={3}>
          <PieChart
            width={200}
            height={180}
            series={[
              {
                data,
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

          {/* Centered total */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{ transform: "translate(-50%, -50%)" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h5" fontWeight={700}>
              ₦{total.toLocaleString()}
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
            Top category: {topCategory.label} ($
            {topCategory.value.toLocaleString()})
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
