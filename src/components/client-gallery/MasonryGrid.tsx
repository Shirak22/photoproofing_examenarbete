import ImageCardClient from "./ImageCardClient";
import { TAlbum, TThumbnail } from "@/core/types";

export default function MasonryGrid({
  album,
  thumbnails,
}: {
  album: TAlbum;
  thumbnails: TThumbnail[];
}) {
  return (
    <section className="columns-5 gap-2 px-2 [&>div:not(:first-child)]:mt-2 ">
      {thumbnails.map((image: any, i: number) => (
        <ImageCardClient
          image={image}
          key={i}
          selectedLimit={album.selectedLimit}
        />
      ))}
    </section>
  );
}
