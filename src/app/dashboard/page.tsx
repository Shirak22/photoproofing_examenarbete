import DashboardLayout from "@/components/DashboardLayout";
import NewClientForm from "@/components/NewClientForm";
import ClientTableSSR from "@/components/ClientTableSSR";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function Dashboard() {
  
  return (
    <>
        
        <h1 className="text-5xl font-bold my-20 mb-40">Your Dashboard</h1>
        <ClientTableSSR />
        <NewClientForm />

      {/* <TableHandler type="client" /> */}
    </>
  );
}
