import { getAlbum, getAlbumThumbnails } from "@/app/actions";
import GallerySection from "@/components/client-gallery/GallerySection";
import Hero from "@/components/client-gallery/Hero";

export default async function ClientGallery({
  params,
}: {
  params: { albumId: string };
}) {
  const thumbs = await getAlbumThumbnails(params.albumId);
  const album = await getAlbum(params.albumId);

  return (
    <div>
      <Hero title={album.title} description={album.description} />
      <GallerySection album={album} thumbs={thumbs || []} />
    </div>
  );
}
