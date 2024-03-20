import { getAlbum, getAlbumThumbnails, getAllImages } from "@/app/actions";
import Hero from "@/components/client-gallery/Hero";
import MasonryGrid from "@/components/client-gallery/MasonryGrid";
import SelectionBar from "@/components/client-gallery/SelectionBar";

export default async function ClientGallery({
  params,
}: {
  params: { albumId: string };
}) {
  const thumbs = await getAlbumThumbnails(params.albumId);
  const album = await getAlbum(params.albumId);

  return (
    <>
      <Hero title={album.title} description={album.description} />
      <SelectionBar
        title={album.title}
        description={album.description}
        selectedLimit={album.selectedLimit}
        images={thumbs}
        className="flex justify-between w-full p-8 h-28 bg-neutral-50  sticky z-10 top-0 left-0 "
      />
      <MasonryGrid thumbnails={thumbs} />
    </>
  );
}
