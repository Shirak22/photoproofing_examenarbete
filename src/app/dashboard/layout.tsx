import DashboardLayout from "@/components/DashboardLayout";
import NewClientForm from "@/components/NewClientForm";
import ClientTableSSR from "@/components/ClientTableSSR";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function DashboardLayoutFile({
  children,
  params
}: {
  children: React.ReactNode,
  params: {clientId: string, albumId: string},
}) {

  
    
  return (
    <DashboardLayout >
      <Breadcrumbs />
      {children}
    </DashboardLayout>
  );
}
