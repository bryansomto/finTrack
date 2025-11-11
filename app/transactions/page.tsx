import DashboardLayout from "@/components/DashboardLayout";
import Transactions from "./transactions";
import AddTransactionButton from "@/components/Buttons/AddTransactionButton";

export default function TransactionsPage() {
  return (
    <DashboardLayout button={<AddTransactionButton />}>
      <Transactions />
    </DashboardLayout>
  );
}
