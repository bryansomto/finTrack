"use client";

import { useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Avatar,
  Stack,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import { Goal, getGoalIcon } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

const MiniGoalItem: React.FC<{ goal: Goal }> = ({ goal }) => {
  const theme = useTheme();
  const percent =
    goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;

  return (
    <Paper
      elevation={0}
      sx={{
        scrollSnapAlign: "start",
        p: 2,
        borderRadius: 2,
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.04)"
            : "rgba(255, 255, 255, 0.08)",
      }}
    >
      <Stack spacing={1}>
        {/* Top Row: Icon and Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              bgcolor: "transparent",
              color: "text.secondary",
            }}
          >
            {getGoalIcon(goal.icon)}
          </Avatar>
          <Typography
            variant="body1"
            fontWeight={600}
            color="text.primary"
            sx={{ textTransform: "capitalize" }}
          >
            {goal.title}
          </Typography>
        </Box>

        <Stack>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            {formatCurrency(goal.currentAmount)}
          </Typography>
          {goal.type === "Saving" && (
            <Typography variant="caption" color="text.secondary">
              of {formatCurrency(goal.targetAmount)}
            </Typography>
          )}
        </Stack>

        {goal.type === "Saving" && (
          <LinearProgress
            variant="determinate"
            value={Math.min(percent, 100)}
            color={percent > 70 ? "warning" : "primary"}
            sx={{ height: 6, borderRadius: 5 }}
          />
        )}
      </Stack>
    </Paper>
  );
};

export default function GoalsCard({ goals }: { goals: Goal[] }) {
  const theme = useTheme();

  const activeGoals = useMemo(() => {
    return goals.filter((goal) => !goal.completed);
  }, [goals]);

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
          mb={2}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Active Goals
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {activeGoals.length} Active
          </Typography>
        </Stack>

        <Box
          sx={{
            gap: 1.5,

            // --- MOBILE-FIRST (Horizontal Grid Scroll) ---
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: "minmax(240px, 1fr)",
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",

            // --- DESKTOP OVERRIDE (Vertical Flex Scroll) ---
            [theme.breakpoints.up("sm")]: {
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              overflowX: "hidden",
              scrollSnapType: "y mandatory",
              height: "300px",
            },

            // --- General Scrollbar Hiding ---
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {activeGoals.map((goal) => (
            <MiniGoalItem key={goal.id} goal={goal} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
