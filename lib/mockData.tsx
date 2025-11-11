interface WeeklyData {
  day: string;
  netIncome: number;
  outcome: number;
}

export interface Goal {
  title: string;
  description: string;
  completed?: boolean;
}

export interface customerAccounts {
  bank: string;
  shortName: string;
  accountNumber: number;
  balance: number;
  colorScheme?: keyof typeof colorSchemes;
}

export const incomeData = [
  { id: 0, value: 60, label: "Salary", color: "#3EC7E0" },
  { id: 1, value: 30, label: "Selling", color: "#8FE388" },
  { id: 2, value: 10, label: "Donation", color: "#C3E7E3" },
];

export const spentData = [
  { label: "Utilities", percent: 19.5, color: "#FF7043" },
  { label: "Others", percent: 8.9, color: "#FFA726" },
  { label: "Groceries", percent: 28.9, color: "#66BB6A" },
  { label: "Entertainment", percent: 5, color: "#7E57C2" },
  { label: "Rent", percent: 29.5, color: "#EC407A" },
];

export const weeklyData: WeeklyData[] = [
  { day: "Mon", netIncome: 1200, outcome: 800 },
  { day: "Tue", netIncome: 1900, outcome: 1200 },
  { day: "Wed", netIncome: 1500, outcome: 900 },
  { day: "Thu", netIncome: 2100, outcome: 1100 },
  { day: "Fri", netIncome: 1800, outcome: 1400 },
  { day: "Sat", netIncome: 2500, outcome: 1700 },
  { day: "Sun", netIncome: 2200, outcome: 1300 },
];

export const financialGoals: Goal[] = [
  {
    title: "Emergency Fund",
    description: "Save ₦10,000 for emergency expenses",
    completed: true,
  },
  {
    title: "Pay Off Credit Card",
    description: "Clear ₦5,000 credit card debt",
    completed: false,
  },
  {
    title: "Retirement Savings",
    description: "Contribute ₦500/month to 401k",
    completed: true,
  },
  {
    title: "Down Payment",
    description: "Save ₦50,000 for house down payment",
    completed: false,
  },
  {
    title: "Investment Portfolio",
    description: "Build ₦25,000 investment portfolio",
    completed: false,
  },
];

export const customerAccounts: customerAccounts[] = [
  {
    bank: "United Bank for Africa",
    shortName: "UBA",
    accountNumber: 2074606070,
    balance: 2107058,
  },
  {
    bank: "Opay",
    shortName: "Opay",
    accountNumber: 8168038695,
    balance: 102675,
  },
  {
    bank: "Moniepoint",
    shortName: "Moniepoint",
    accountNumber: 5563442010,
    balance: 51250,
  },
];

export const colorSchemes = {
  green: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  blue: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  purple: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  orange: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
};

// --- ADD THESE TO YOUR lib/mockData.ts FILE ---

import {
  ShoppingCart,
  AttachMoney,
  Theaters,
  Bolt,
  DirectionsBus,
  Redeem,
} from "@mui/icons-material";

// 1. Define the possible categories
export type TransactionCategory =
  | "Groceries"
  | "Income"
  | "Entertainment"
  | "Utilities"
  | "Transport"
  | "Shopping"
  | "Other";

// 2. Define the new Transaction interface
export interface Transaction {
  id: string;
  date: string; // Use ISO string (e.g., new Date().toISOString()) for easy sorting
  name: string;
  description?: string;
  amount: number; // Positive for Income, Negative for Expense
  type: "Income" | "Expense";
  category: TransactionCategory;
  accountId: number; // Links to customerAccounts (using accountNumber)
}

// 3. A list of categories for filter dropdowns
export const transactionCategories: TransactionCategory[] = [
  "Groceries",
  "Income",
  "Entertainment",
  "Utilities",
  "Transport",
  "Shopping",
  "Other",
];

// 4. Icon mapping helper
export const getCategoryIcon = (category: TransactionCategory) => {
  switch (category) {
    case "Groceries":
      return <ShoppingCart />;
    case "Income":
      return <AttachMoney />;
    case "Entertainment":
      return <Theaters />;
    case "Utilities":
      return <Bolt />;
    case "Transport":
      return <DirectionsBus />;
    case "Shopping":
      return <Redeem />;
    default:
      return <ShoppingCart />;
  }
};

// 5. Your new mock transaction data
export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    date: "2025-11-10T09:30:00Z", // Today, Nov 10
    name: "Shoprite",
    amount: -12500,
    type: "Expense",
    category: "Groceries",
    accountId: 2074606070,
  },
  {
    id: "t5",
    date: "2025-11-10T14:20:00Z", // Today, Nov 10
    name: "Local Market (Cash)",
    description: "Bus ride to market and back",
    amount: -500,
    type: "Expense",
    category: "Transport",
    accountId: 8168038695,
  },
  {
    id: "t2",
    date: "2025-11-05T15:00:00Z", // Monday, Nov 05
    name: "Salary - FinTrack Inc.",
    amount: 132500,
    type: "Income",
    category: "Income",
    accountId: 2074606070,
  },
  {
    id: "t3",
    date: "2025-11-03T18:00:00Z", // Friday, Nov 03
    name: "Netflix Subscription",
    amount: -3500,
    type: "Expense",
    category: "Entertainment",
    accountId: 8168038695,
  },
  {
    id: "t4",
    date: "2025-11-03T08:15:00Z", // Friday, Nov 03
    name: "Bolt Ride",
    amount: -2200,
    type: "Expense",
    category: "Transport",
    accountId: 8168038695,
  },
  {
    id: "t6",
    date: "2025-11-02T10:00:00Z",
    name: "Airtime Top-up",
    amount: -1000,
    type: "Expense",
    category: "Utilities",
    accountId: 5563442010,
  },
];
