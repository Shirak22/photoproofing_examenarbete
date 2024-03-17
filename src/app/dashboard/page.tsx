import DashboardLayout from "@/components/DashboardLayout";
import NewClientForm from "@/components/NewClientForm";
import ClientTableSSR from "@/components/ClientTableSSR";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession();

  const redirectIfNotSignedIn = async () => {
    "use server";
    if (!session) {
      redirect("/api/auth/signin");
    }
  };
  return (
    <DashboardLayout>
      {session ? (
        <>
          <h1 className="text-5xl font-bold my-20 mb-40">Your Dashboard</h1>
          <ClientTableSSR />
          <NewClientForm />
        </>
      ) : (
        <form action={redirectIfNotSignedIn}>
          <h1>Welcome to the dashboard, please sign in to continue</h1>
          <button type="submit">Sign in</button>
        </form>
      )}
      {/* <TableHandler type="client" /> */}
    </DashboardLayout>
  );
}
