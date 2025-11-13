"use client";

import { Box, Typography, List, Divider } from "@mui/material";
import { Transaction, TransactionCategory } from "@/lib/mockData";
import TransactionItem from "./TransactionItem";
import { formatDateHeading } from "@/lib/utils";

interface ListProps {
  transactions: Transaction[];
  onUpdateCategory: (txId: string, newCategory: TransactionCategory) => void;
}

export default function TransactionList({
  transactions,
  onUpdateCategory,
}: ListProps) {
  // --- Date Grouping Logic ---
  const groupedTransactions = transactions.reduce((acc, tx) => {
    const dateKey = tx.date.split("T")[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(tx);
    return acc;
  }, {} as Record<string, Transaction[]>);

  // Get sorted date keys (most recent first)
  const sortedDateKeys = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  if (transactions.length === 0) {
    return <Typography>No transactions found for these filters.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight={500} gutterBottom>
        All Transactions
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {sortedDateKeys.map((dateKey) => (
          <Box key={dateKey} sx={{ mb: 2 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ px: 2, pt: 1, fontWeight: 600 }}
            >
              {formatDateHeading(dateKey)}
            </Typography>
            {groupedTransactions[dateKey].map((tx) => (
              <TransactionItem
                key={tx.id}
                transaction={tx}
                onUpdateCategory={onUpdateCategory}
              />
            ))}
            <Divider sx={{ mt: 1 }} />
          </Box>
        ))}
      </List>
    </Box>
  );
}
