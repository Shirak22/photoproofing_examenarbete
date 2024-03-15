import { getAlbum, getAlbumThumbnails, getClient } from "@/app/actions";
import AlbumGallery from "@/components/AlbumGallery";

export default async function ClientGallery({
  params,
}: {
  params: { albumId: string };
}) {
  // Hämta album från databasen
  // Hämta bilder från S3
  const albumData = await getAlbum(params.albumId);
  const clientData = await getClient(albumData.clientId);
  const albumThumbnails = await getAlbumThumbnails(params.albumId);
  console.log(albumThumbnails);

  return (
    <div>
      <h1 className="text-4xl">Album {albumData.title}</h1>
      <h1 className="text-4xl">Client {clientData.clientName}</h1>
      <AlbumGallery albumId={params.albumId} images={albumThumbnails} />
    </div>
  );
}
