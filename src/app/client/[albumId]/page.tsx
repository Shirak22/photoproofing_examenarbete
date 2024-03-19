import { getAlbum, getAlbumThumbnails, getClient, getPhotographer } from "@/app/actions";
import Client from "@/app/dashboard/[clientId]/page";
import AlbumGallery from "@/components/AlbumGallery";
import ClientPasswordInput from "@/components/clientPasswordInput";
import { notFound } from "next/navigation";

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

  if (!albumInfo || !clientData || !albumThumbnails) return notFound();
  const isLogged = false;
  return (
    isLogged ? (
      <div>
        <h1 className="text-4xl">Album {albumInfo?.title}</h1>
        <h1 className="text-4xl">Client {clientData?.clientName}</h1>
        <AlbumGallery
          albumId={params.albumId}
          images={albumThumbnails}
          albumData={albumInfo}
        />
      </div>
    ) : (
      <ClientPasswordInput />
    )

  );
}
