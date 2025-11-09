"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";

type SpentItem = {
  label: string;
  percent: number;
  color: string;
};

interface SpentCardProps {
  title?: string;
  total: number;
  data: SpentItem[];
  accountLabel?: string;
}

export default function SpentCard({
  title = "Total Spent",
  total,
  data,
  accountLabel = "All accounts",
}: SpentCardProps) {
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
          ₦{total.toLocaleString()}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>
          {data.map((item) => (
            <Box key={item.label}>
              <Typography
                variant="body2"
                fontWeight={600}
                color="text.secondary"
              >
                {item.label} — {item.percent}%
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
