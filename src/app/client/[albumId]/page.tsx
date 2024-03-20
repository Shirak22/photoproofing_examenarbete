import { getAlbum, getAlbumThumbnails, getClient } from "@/app/actions";
import AlbumGallery from "@/components/AlbumGallery";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";


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
  
  const session = await getServerSession();
  if (!session || session?.user?.name !== params.albumId) return redirect(`/client/login?albumId=${params.albumId}`);  
  return (
      <div>
        <h1 className="text-4xl">Album {albumInfo?.title}</h1>
        <h1 className="text-4xl">Client {clientData?.clientName}</h1>
        <AlbumGallery
          albumId={params.albumId}
          images={albumThumbnails}
          albumData={albumInfo}
        />
      </div>
  );



}
