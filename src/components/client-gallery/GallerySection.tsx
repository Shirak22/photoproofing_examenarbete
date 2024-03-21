import { TAlbum, TThumbnail } from "@/core/types";
import SelectionBar from "./SelectionBar";
import MasonryGrid from "./MasonryGrid";

export default function GallerySection({
  album,
  thumbs,
}: {
  album: TAlbum;
  thumbs: TThumbnail[];
}) {
  return (
    <>
      <SelectionBar
        album={album}
        className="flex justify-between w-full p-8 h-28 bg-neutral-50  sticky z-10 top-0 left-0 "
      />
      <MasonryGrid album={album} thumbnails={thumbs} />
    </>
  );
}
