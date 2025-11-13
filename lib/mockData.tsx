import {
  ShoppingCart,
  AttachMoney,
  Theaters,
  Bolt,
  DirectionsBus,
  Redeem,
  House,
  Savings,
  CreditCardOff,
  AccountBalance,
  FlightTakeoff,
  Storefront,
  Favorite,
} from "@mui/icons-material";

export const spentData = [
  { label: "Utilities", percent: 19.5, color: "#FF7043" },
  { label: "Others", percent: 8.9, color: "#FFA726" },
  { label: "Groceries", percent: 28.9, color: "#66BB6A" },
  { label: "Entertainment", percent: 5, color: "#7E57C2" },
  { label: "Rent", percent: 29.5, color: "#EC407A" },
];

// Net income interface definition
interface WeeklyData {
  day: string;
  netIncome: number;
  outcome: number;
}

// Net income data
export const weeklyData: WeeklyData[] = [
  { day: "Mon", netIncome: 1200, outcome: 800 },
  { day: "Tue", netIncome: 1900, outcome: 1200 },
  { day: "Wed", netIncome: 1500, outcome: 900 },
  { day: "Thu", netIncome: 2100, outcome: 1100 },
  { day: "Fri", netIncome: 1800, outcome: 1400 },
  { day: "Sat", netIncome: 2500, outcome: 1700 },
  { day: "Sun", netIncome: 2200, outcome: 1300 },
];

// Goals interface definition
export type GoalType = "Saving" | "Contribution";
export interface Goal {
  id: string;
  title: string;
  icon: string;
  type: GoalType;
  currentAmount: number;
  targetAmount: number;
  contributionAmount?: number;
  completed: boolean;
}

// Goal icon helper function
export const getGoalIcon = (iconName: string) => {
  switch (iconName) {
    case "Emergency":
      return <Savings />;
    case "CreditCard":
      return <CreditCardOff />;
    case "Retirement":
      return <AccountBalance />;
    case "DownPayment":
      return <House />;
    case "Vacation":
      return <FlightTakeoff />;
    default:
      return <Savings />;
  }
};

// Goals data
export const mockGoals: Goal[] = [
  // --- Active Goals ---
  {
    id: "g1",
    title: "Emergency Fund",
    icon: "Emergency",
    type: "Saving",
    currentAmount: 10000,
    targetAmount: 50000,
    completed: false,
  },
  {
    id: "g2",
    title: "Pay Off Credit Card",
    icon: "CreditCard",
    type: "Saving",
    currentAmount: 5000,
    targetAmount: 50000,
    completed: false,
  },
  {
    id: "g3",
    title: "Retirement Savings",
    icon: "Retirement",
    type: "Contribution",
    currentAmount: 1500,
    targetAmount: 0,
    contributionAmount: 500,
    completed: false,
  },
  {
    id: "g4",
    title: "Down Payment",
    icon: "DownPayment",
    type: "Saving",
    currentAmount: 0,
    targetAmount: 50000,
    completed: false,
  },
  // --- Completed Goal ---
  {
    id: "g5",
    title: "Vacation Fund",
    icon: "Vacation",
    type: "Saving",
    currentAmount: 30000,
    targetAmount: 30000,
    completed: true,
  },
];

// Customer accounts interface definition
export interface customerAccounts {
  bank: string;
  shortName: string;
  accountNumber: number;
  balance: number;
  colorScheme?: keyof typeof colorSchemes;
}

// Customer accounts data
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

// Color schemes
export const colorSchemes = {
  green: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  blue: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  purple: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  orange: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
};

// Categories type definition
export type TransactionCategory =
  | "Groceries"
  | "Entertainment"
  | "Utilities"
  | "Transport"
  | "Shopping"
  | "Rent"
  | "Salary"
  | "Selling"
  | "Donation"
  | "Other";

// A list of categories for filter dropdowns
export const transactionCategories: TransactionCategory[] = [
  "Groceries",
  "Entertainment",
  "Utilities",
  "Transport",
  "Shopping",
  "Rent",
  "Other",
];

// Icon mapping helper
export const getCategoryIcon = (category: TransactionCategory) => {
  switch (category) {
    case "Groceries":
      return <ShoppingCart />;
    case "Entertainment":
      return <Theaters />;
    case "Utilities":
      return <Bolt />;
    case "Transport":
      return <DirectionsBus />;
    case "Shopping":
      return <Redeem />;
    case "Rent":
      return <House />;
    case "Salary":
      return <AttachMoney />;
    case "Selling":
      return <Storefront />;
    case "Donation":
      return <Favorite />;
    default:
      return <ShoppingCart />;
  }
};

// Transaction interface definition
export interface Transaction {
  id: string;
  date: string;
  name: string;
  description?: string;
  amount: number;
  type: "Income" | "Expense";
  category: TransactionCategory;
  accountId: number;
}

// Transaction data
export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    date: "2025-11-10T09:30:00Z",
    name: "Shoprite",
    amount: -12500,
    type: "Expense",
    category: "Groceries",
    accountId: 2074606070,
  },
  {
    id: "t2",
    date: "2025-11-05T15:00:00Z",
    name: "Salary - FinTrack Inc.",
    amount: 132500,
    type: "Income",
    category: "Salary",
    accountId: 2074606070,
  },
  {
    id: "t3",
    date: "2025-11-03T18:00:00Z",
    name: "Netflix Subscription",
    amount: -3500,
    type: "Expense",
    category: "Entertainment",
    accountId: 8168038695,
  },
  {
    id: "t4",
    date: "2025-11-03T08:15:00Z",
    name: "Bolt Ride",
    amount: -2200,
    type: "Expense",
    category: "Transport",
    accountId: 8168038695,
  },

  {
    id: "t5",
    date: "2025-11-10T14:20:00Z",
    name: "Local Market (Cash)",
    description: "Bus ride to market and back",
    amount: -500,
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
  {
    id: "t7",
    date: "2025-11-06T10:00:00Z",
    name: "NEPA Bill (Eko Electric)",
    amount: -18500,
    type: "Expense",
    category: "Utilities",
    accountId: 5563442010,
  },
  {
    id: "t8",
    date: "2025-11-08T17:00:00Z",
    name: "Ebeano Supermarket",
    amount: -16400,
    type: "Expense",
    category: "Groceries",
    accountId: 2074606070,
  },
  {
    id: "t9",
    date: "2025-11-07T10:00:00Z",
    name: "Sold Graphics Card",
    amount: 35000,
    type: "Income",
    category: "Selling",
    accountId: 8168038695,
  },
  {
    id: "t10",
    date: "2025-11-08T12:00:00Z",
    name: "Gift from Uncle",
    amount: 10000,
    type: "Income",
    category: "Donation",
    accountId: 2074606070,
  },
];

// Budget interface definition
export interface Budget {
  id: string;
  category: TransactionCategory;
  limit: number;
  month: string;
}
// Budget data
export const mockBudgets: Budget[] = [
  // --- November 2025 Budgets ---
  {
    id: "b1",
    category: "Groceries",
    limit: 40000,
    month: "2025-11",
  },
  {
    id: "b2",
    category: "Rent",
    limit: 29500,
    month: "2025-11",
  },
  {
    id: "b3",
    category: "Utilities",
    limit: 15000,
    month: "2025-11",
  },
  {
    id: "b4",
    category: "Entertainment",
    limit: 15500,
    month: "2025-11",
  },

  // --- October 2025 Budgets ---
  {
    id: "b5",
    category: "Groceries",
    limit: 35000,
    month: "2025-10",
  },
  {
    id: "b6",
    category: "Rent",
    limit: 29500,
    month: "2025-10",
  },
  {
    id: "b7",
    category: "Utilities",
    limit: 20000,
    month: "2025-10",
  },
];
