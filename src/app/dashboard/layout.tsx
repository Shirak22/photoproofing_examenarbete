import DashboardLayout from "@/components/DashboardLayout";
import NewClientForm from "@/components/NewClientForm";
import ClientTableSSR from "@/components/ClientTableSSR";

export default async function DashboardLayoutFile({children}: {children: React.ReactNode} ) {
  return (

      <DashboardLayout>
        {children}
      </DashboardLayout>

  );
}
