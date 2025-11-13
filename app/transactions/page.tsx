import DashboardLayout from "@/components/DashboardLayout";
import AddTransactionButton from "@/components/Buttons/AddTransactionButton";
import Transactions from "./transactions";

export default function TransactionsPage() {
  return (
    <DashboardLayout button={<AddTransactionButton />}>
      <Transactions />
    </DashboardLayout>
  );
}
