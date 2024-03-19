import { getAlbum, getAlbumThumbnails, getClient, getPhotographer } from "@/app/actions";
import DashboardLayout from "@/components/DashboardLayout";
import ImageCardDashboard from "@/components/ImageCardDashboard";
import UploadFiles from "@/components/uploadFiles";
import { getServerSession } from "next-auth";

export default async function Album({
  params,
}: {
  params: {
    clientId: string;
    albumId: string;
  };
}) {
  const session = await getServerSession();
  const album = await getAlbum(params.albumId);
  const thumbs = await getAlbumThumbnails(params.albumId);
  const { photographerId } = await getClient(params.clientId);
  const { userId } = await getPhotographer(session?.user?.email as string);

  if (photographerId !== userId) {
    return (
      <DashboardLayout>
        <h1 className="text-5xl font-bold my-20 mb-40">
          You don't have access to this album
        </h1>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-5xl font-bold">{album.title}</h1>

      <UploadFiles albumId={params.albumId} />

      <section className="flex gap-4 flex-wrap">
        {thumbs &&
          thumbs.map((image: any) => (
            <ImageCardDashboard image={image} albumId={params.albumId} />
          ))}
      </section>
    </DashboardLayout>
  );
}
