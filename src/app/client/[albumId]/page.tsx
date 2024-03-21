import { getAlbum, getAlbumThumbnails } from "@/app/actions";
import GallerySection from "@/components/client-gallery/GallerySection";
import Hero from "@/components/client-gallery/Hero";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function ClientGallery({
  params,
}: {
  params: { albumId: string };
}) {
  const thumbs = await getAlbumThumbnails(params.albumId);
  const album = await getAlbum(params.albumId);

  if (!album || !thumbs) return notFound();

  const session = await getServerSession();
  if (!session || session?.user?.name !== params.albumId)
    return redirect(`/client/login?albumId=${params.albumId}`);
  return (
    <div>
      <Hero title={album.title} description={album.description} />
      <GallerySection album={album} thumbs={thumbs || []} />
    </div>
  );
}
