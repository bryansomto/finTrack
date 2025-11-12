import { colorSchemes, TransactionCategory } from "./mockData";

export type CustomerAccount = {
  bank: string;
  shortName: string;
  accountNumber: number;
  balance: number;
  colorScheme?: keyof typeof colorSchemes;
};

export interface Filters {
  dateRange?: string;
  accountId?: number | "All";
  type?: "Income" | "Expense" | "All";
  category?: TransactionCategory | "All";
  searchQuery?: string;
}