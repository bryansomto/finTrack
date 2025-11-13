import DashboardLayout from "@/components/DashboardLayout";
import AddCardButton from "@/components/Buttons/AddCardButton";
import Cards from "./cards";

export default function CardsPage() {
  return (
    <DashboardLayout button={<AddCardButton />}>
      <Cards />
    </DashboardLayout>
  );
}
