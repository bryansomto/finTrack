"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import { mockGoals, Goal } from "@/lib/mockData";
import GoalCard from "@/components/Goals/GoalCard";

export default function Goals() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentTab, setCurrentTab] = useState<"active" | "completed">(
    "active"
  );

  // Filter Goals Based on Tab State
  const { activeGoals, completedGoals } = useMemo(() => {
    const active: Goal[] = [];
    const completed: Goal[] = [];
    mockGoals.forEach((goal) => {
      if (goal.completed) {
        completed.push(goal);
      } else {
        active.push(goal);
      }
    });
    return { activeGoals: active, completedGoals: completed };
  }, [mockGoals]);

  const displayedGoals = currentTab === "active" ? activeGoals : completedGoals;

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: "active" | "completed"
  ) => {
    setCurrentTab(newValue);
  };

  return (
    <Stack spacing={3} p={isMobile ? 1 : 3} minWidth={0}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="Goals tabs"
        >
          <Tab
            label={`Active (${activeGoals.length})`}
            value="active"
            sx={{ textTransform: "none", fontSize: "1rem" }}
          />
          <Tab
            label={`Completed (${completedGoals.length})`}
            value="completed"
            sx={{ textTransform: "none", fontSize: "1rem" }}
          />
        </Tabs>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 2,
        }}
      >
        {displayedGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </Box>
    </Stack>
  );
}
