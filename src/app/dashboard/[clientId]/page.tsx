import AlbumTableSSR from "@/components/AlbumTableSSR";
import DashboardLayout from "@/components/DashboardLayout";
import NewAlbumForm from "@/components/NewAlbumForm";

export default function Client({
  params,
}: {
  params: {
    clientId: string;
  };
}) {
  return (
    <DashboardLayout>
      <h1 className="text-5xl font-bold my-20 mb-40">
        {params.clientId.toUpperCase()}
      </h1>
      {/* <TableHandler type="album" /> */}
      <AlbumTableSSR />
      <NewAlbumForm clientId={params.clientId} />
    </DashboardLayout>
  );
}
