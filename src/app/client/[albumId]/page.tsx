import { getAlbum, getAlbumThumbnails, getClient } from "@/app/actions";
import AlbumGallery from "@/components/AlbumGallery";

export default async function ClientGallery({
  params,
}: {
  params: { albumId: string };
}) {
  // Hämta album från databasen
  // Hämta bilder från S3
  const albumInfo = await getAlbum(params.albumId);
  const clientData = await getClient(albumInfo.clientId);
  const albumThumbnails = await getAlbumThumbnails(params.albumId);


  return (
    <div>
      <h1 className="text-4xl">Album {albumInfo.title}</h1>
      <h1 className="text-4xl">Client {clientData.clientName}</h1>
      <AlbumGallery
        albumId={params.albumId}
        images={albumThumbnails}
        albumData={albumInfo}
      />
    </div>
  );
}
