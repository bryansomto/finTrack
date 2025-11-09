interface DailyData {
  day: string;
  netIncome: number;
  outcome: number;
}

export interface Goal {
  title: string;
  description: string;
  completed?: boolean;
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

  // Mock data for weekly income and expenses
export const weeklyData: DailyData[] = [
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
    completed: true
  },
  {
    title: "Pay Off Credit Card",
    description: "Clear ₦5,000 credit card debt",
    completed: false
  },
  {
    title: "Retirement Savings",
    description: "Contribute ₦500/month to 401k",
    completed: true
  },
  {
    title: "Down Payment",
    description: "Save ₦50,000 for house down payment",
    completed: false
  },
  {
    title: "Investment Portfolio",
    description: "Build ₦25,000 investment portfolio",
    completed: false
  }
];