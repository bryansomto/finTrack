"use client";

import { useState } from "react";
import { Stack, useTheme, useMediaQuery } from "@mui/material";
import {
  mockTransactions,
  customerAccounts,
  transactionCategories,
  Transaction,
  TransactionCategory,
} from "@/lib/mockData";
import TransactionFilterBar from "@/components/Transactions/TransactionFilterBar";
import TransactionList from "@/components/Transactions/TransactionList";
import { Filters } from "@/lib/types";

export default function Transactions() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);

  const [filters, setFilters] = useState<Filters>({
    dateRange: "This Month",
    accountId: "All",
    type: "All",
    category: "All",
    searchQuery: "",
  });

  // --- LOGIC ---
  // This logic applies the filters to the master list
  const filteredTransactions = transactions.filter((tx) => {
    if (filters.accountId !== "All" && tx.accountId !== filters.accountId) {
      return false;
    }
    if (filters.type !== "All" && tx.type !== filters.type) {
      return false;
    }
    if (filters.category !== "All" && tx.category !== filters.category) {
      return false;
    }
    if (
      filters.searchQuery &&
      !tx.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // function passed to the TransactionItem to update the main state
  const handleUpdateCategory = (
    txId: string,
    newCategory: TransactionCategory
  ) => {
    setTransactions((prevTxs) =>
      prevTxs.map((tx) =>
        tx.id === txId ? { ...tx, category: newCategory } : tx
      )
    );
    console.log(`Transaction ${txId} category changed to ${newCategory}`);
  };

  return (
    <Stack spacing={3} p={isMobile ? 1 : 3}>
      {/* FILTER BAR */}
      <TransactionFilterBar
        filters={filters}
        setFilters={setFilters}
        accounts={customerAccounts}
        categories={transactionCategories}
      />

      {/* TRANSACTION LIST */}
      <TransactionList
        transactions={filteredTransactions}
        onUpdateCategory={handleUpdateCategory}
      />
    </Stack>
  );
}
