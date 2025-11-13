import DashboardLayout from "@/components/DashboardLayout";
import AddBudgetButton from "@/components/Buttons/AddBudgetButton";
import Budgets from "./budgets";

export default function BudgetsPage() {
  return (
    <DashboardLayout button={<AddBudgetButton />}>
      <Budgets />
    </DashboardLayout>
  );
}
