import { TAlbum } from "@/core/types/types";
import SelectionBar from "./SelectionBar";
import MasonryGrid from "./MasonryGrid";

export default async function GallerySection({ album }: { album: TAlbum }) {
  return (
    <>
      <SelectionBar
        album={album}
        className="flex justify-between w-full p-8 h-28 bg-neutral-50  sticky z-10 top-0 left-0 "
      />
      <MasonryGrid album={album} />
    </>
  );
}
