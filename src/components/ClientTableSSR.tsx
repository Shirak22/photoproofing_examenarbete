import { getAllClients, getPhotographer } from "@/app/actions";
import { TClient } from "@/core/types";
import Link from "next/link";
import EmptyState from "./EmptyState";
import { getServerSession } from "next-auth";

export default async function ClientTableSSR() {
  const session = await getServerSession();
  const photographer = await getPhotographer(session?.user?.email as string);
  const clients = await getAllClients(photographer.userId);

  return (
    <>
      {clients && Array.isArray(clients) && clients.length > 0 ? (
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
                Title
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
                Role
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
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                    <span className="sr-only">, {client.clientName}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyState type="Client" />
      )}
    </>
  );
}
