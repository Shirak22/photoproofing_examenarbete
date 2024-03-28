import DashboardLayout from "@/components/DashboardLayout";
import Breadcrumbs from "@/components/Dashboard-components/other/Breadcrumbs";

export default async function DashboardLayoutFile({
  children,
}: {
  children: React.ReactNode,
}) {

  
    
  return (
    <DashboardLayout >
      <Breadcrumbs />
      {children}
    </DashboardLayout>
  );
}
