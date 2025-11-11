import DashboardLayout from "@/components/DashboardLayout";
import Cards from "./cards";
import AddCardButton from "@/components/Buttons/AddCardButton";

export default function CardsPage() {
  return (
    <DashboardLayout button={<AddCardButton />}>
      <Cards />
    </DashboardLayout>
  );
}
