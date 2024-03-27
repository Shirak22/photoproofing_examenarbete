import { getAllClients, getPhotographer } from "@/app/actions";
import { TClient } from "@/core/types";
import EmptyState from "./EmptyState";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function ClientTableSSR() {
  const session = await getServerSession();
  const photographer = await getPhotographer(session?.user?.email as string);
  const clients = await getAllClients(photographer.userId);

  return (
    <>
      {clients && Array.isArray(clients) && clients.length > 0 ? (
        <section className="px-24 py-20 bg-white rounded-2xl">
          <div className="sm:flex sm:items-center mb-10">
            <div className="sm:flex-auto">
              <h1 className="text-3xl  font-bold text-gray-800">Clients</h1>
              <p className="mt-2 text-gray-500">
                A list of all the clients in your account
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Link
                href="/dashboard/new-client"
                className="block rounded-md bg-gray-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              >
                Add client
              </Link>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Phone
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clients.map((client: TClient) => (
                <tr key={client.clientId}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <Link href={`/dashboard/${client.clientId}`}>
                      {client.clientName}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {client.address}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {client.contact.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {client.contact.phone}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <Link href="" className="text-gray-600 hover:text-gray-900">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <EmptyState type="Client" route="/dashboard/new-client" />
      )}
    </>
  );
}
