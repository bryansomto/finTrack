import DashboardLayout from "@/components/DashboardLayout";
import Accounts from "./accounts";
import AddAccountButton from "@/components/Buttons/AddAccountButton";

export default function AccountsPage() {
  return (
    <DashboardLayout button={<AddAccountButton />}>
      <Accounts />
    </DashboardLayout>
  );
}
