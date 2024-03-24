import NewClientForm from "@/components/NewClientForm";
import ClientTableSSR from "@/components/ClientTableSSR";
import Link from "next/link";

export default async function Dashboard() {
  return (
    <>
      <h1 className="text-5xl font-bold my-20 mb-40">Your Dashboard</h1>
      <ClientTableSSR />
      <Link href={"/dashboard/new-client"}>NEW CLIENT</Link>
    </>
  );
}
