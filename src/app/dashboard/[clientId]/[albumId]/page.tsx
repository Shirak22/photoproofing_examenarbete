import { getAlbum, getAlbumThumbnails } from "@/app/actions";
import DashboardLayout from "@/components/DashboardLayout";
import ImageCardDashboard from "@/components/ImageCardDashboard";
import UploadFiles from "@/components/uploadFiles";

export default async function Album({
  params,
}: {
  params: {
    clientId: string;
    albumId: string;
  };
}) {
  const album = await getAlbum(params.albumId);
  const thumbs = await getAlbumThumbnails(params.albumId);
  return (
    <DashboardLayout>
      <h1 className="text-5xl font-bold">{album.title}</h1>
      {/* <AlbumGrid files={files} /> */}
      {/* <EmptyState type="Images" /> */}

      {/* <form action="setForm" >
        <p>{response.message}</p>
        <input type="file" />
        <button type="submit">Upload</button>
      </form> */}
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
