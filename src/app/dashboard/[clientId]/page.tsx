import { getClient } from "@/app/actions";
import AlbumTableSSR from "@/components/AlbumTableSSR";
import DashboardLayout from "@/components/DashboardLayout";
import NewAlbumForm from "@/components/NewAlbumForm";

export default async function Client({
  params,
}: {
  params: {
    clientId: string;
  };
}) {

  const client = await getClient(params.clientId);

  console.log(client);
  

  return (
    <DashboardLayout>
      {client && 
        <h1 className="text-5xl font-bold my-20 mb-40">
          {client.clientName}
        </h1>
      }

      {/* <TableHandler type="album" /> */}
      <AlbumTableSSR clientId={params.clientId} />
      <NewAlbumForm clientId={params.clientId} />
    </DashboardLayout>
  );
}
