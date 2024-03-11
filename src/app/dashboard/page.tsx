import DashboardLayout from "@/components/DashboardLayout";
import NewClientForm from "@/components/NewClientForm";
import ClientTableSSR from "@/components/ClientTableSSR";

export default async function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-5xl font-bold my-20 mb-40">Your Dashboard</h1>
      {/* <TableHandler type="client" /> */}
      <ClientTableSSR />
      <NewClientForm />
    </DashboardLayout>
  );
}
