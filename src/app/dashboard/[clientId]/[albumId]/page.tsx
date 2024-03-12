import { getAlbum } from "@/app/actions";
import AlbumGrid from "@/components/AlbumGrid";
import DashboardLayout from "@/components/DashboardLayout";
import EmptyState from "@/components/EmptyState";

export default async function Album({
  params,
}: {
  params: {
    clientId: string;
    albumId: string;
  };
}) {
  



  const album = await getAlbum(params.albumId);

  return (
    <DashboardLayout>
      <h1 className="text-5xl font-bold">{album.title}</h1>
      {/* <AlbumGrid files={files} /> */}
      <EmptyState type="Images" />
    </DashboardLayout>
  );
}
