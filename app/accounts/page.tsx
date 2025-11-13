import DashboardLayout from "@/components/DashboardLayout";
import AddAccountButton from "@/components/Buttons/AddAccountButton";
import Accounts from "./accounts";

export default function AccountsPage() {
  return (
    <DashboardLayout button={<AddAccountButton />}>
      <Accounts />
    </DashboardLayout>
  );
}
