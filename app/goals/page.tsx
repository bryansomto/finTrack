import DashboardLayout from "@/components/DashboardLayout";
import AddGoalButton from "@/components/Buttons/AddGoalButton";
import Goals from "./goals";

export default function GoalsPage() {
  return (
    <DashboardLayout button={<AddGoalButton />}>
      <Goals />
    </DashboardLayout>
  );
}
