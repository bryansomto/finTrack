// Helper for filtering transactions by account
import { useState, useMemo, useCallback } from "react";
import {
  mockTransactions,
  Transaction,
  TransactionCategory,
} from "@/lib/mockData";

// Define the shape of your filters
// You can expand this later (e.g., add dateRange, type, etc.)
export interface TransactionFilters {
  accountId: number | "All";
}

/**
 * A custom hook to manage transaction state, filtering, and updates.
 */
export function useTransactions(
  defaultFilters: TransactionFilters = { accountId: "All" }
) {
  // Core state is now managed inside the hook
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);

  const [filters, setFilters] =
    useState<TransactionFilters>(defaultFilters);

  // Memoize derived state for performance
  // This list only recalculates when transactions or filters change
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Account ID filter
      if (filters.accountId !== "All" && tx.accountId !== filters.accountId) {
        return false;
      }

      // --- You could add more filters here in the future ---
      // if (filters.dateRange === "This Month") { ... }
      // if (filters.type !== "All") { ... }

      return true;
    });
  }, [transactions, filters]); // Dependencies

  // Wrap handlers in useCallback for stable function identity
  // This prevents unnecessary re-renders in child components
  const handleUpdateCategory = useCallback(
    (txId: string, newCategory: TransactionCategory) => {
      setTransactions((prevTxs) =>
        prevTxs.map((tx) =>
          tx.id === txId ? { ...tx, category: newCategory } : tx
        )
      );
      console.log(`Transaction ${txId} category changed to ${newCategory}`);
    },
    [] // No dependencies, as setTransactions is stable
  );

  // Return the state and handlers for components to use
  return {
    transactions, // The full, unfiltered list
    filteredTransactions, // The list to render
    filters, // The current filter state (useful for UI)
    setFilters, // The function to update filters
    handleUpdateCategory, // The function to update a category
  };
}