"use client";

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Goal } from "@/lib/mockData";

interface GoalsCardProps {
  title?: string;
  goals: Goal[];
}

export default function GoalsCard({ title = "Goals", goals }: GoalsCardProps) {
  const theme = useTheme();
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
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          {title}
        </Typography>

        <Stack spacing={2}>
          {goals.map((goal, idx) => (
            <Stack
              direction="row"
              spacing={1}
              alignItems="flex-start"
              key={idx}
            >
              <Box mt={0.2}>
                {goal.completed ? (
                  <CheckCircleIcon color="success" fontSize="small" />
                ) : (
                  <RadioButtonUncheckedIcon color="warning" fontSize="small" />
                )}
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {goal.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {goal.description}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
