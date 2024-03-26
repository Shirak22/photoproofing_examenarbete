import { getClient, getPhotographer } from "@/app/actions";
import AlbumTableSSR from "@/components/AlbumTableSSR";
import NewAlbumForm from "@/components/NewAlbumForm";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Client({
  params,
}: {
  params: {
    clientId: string;
  };
}) {
  const session = await getServerSession();
  const client = await getClient(params.clientId);
  const { userId } = await getPhotographer(session?.user?.email as string);
  //set client in  globalcontext
  if (client.photographerId !== userId) {
    return (
      <>
        <h1 className="text-5xl font-bold my-20 mb-40">
          You don't have access to this client
        </h1>
      </>
    );
  }
  const stats = [
    { name: "Total albums", value: "12", stat: "+4 last week" },
    { name: "Awaiting selection", value: "6", stat: "+2 last week" },
  ];

  return (
    <>
      <div className="grid grid-cols-2 mt-12 mb-6 gap-6">
        <div className="px-24 py-10 bg-white rounded-2xl flex">
          <h1 className="text-5xl font-bold my-auto">{client.clientName}</h1>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className=" bg-white px-4 py-6 sm:px-6 lg:px-8 rounded-2xl flex flex-col gap-8"
            >
              <p className="text-sm font-medium leading-6 text-gray-600">
                {stat.name}
              </p>
              <p className=" flex items-baseline gap-x-4 mt-auto ">
                <span className="text-6xl font-semibold tracking-tight text-gray-800">
                  {stat.value}
                </span>
                {stat.stat ? (
                  <span className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-100 bg-green-50">
                    <svg
                      className="h-2 w-2 fill-green-500"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} />
                    </svg>
                    {stat.stat}
                  </span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
      <AlbumTableSSR clientId={params.clientId} />
    </>
  );
}
