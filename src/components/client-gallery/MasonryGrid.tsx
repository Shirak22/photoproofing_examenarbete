"use client";
import { useGlobalContext } from "@/app/context/store";
import ImageCardClient from "./ImageCardClient";
import { TAlbum } from "@/core/types";

export default function MasonryGrid({ album }: { album: TAlbum }) {
  const { selectedImages } = useGlobalContext();

  return (
    <section className="columns-5 gap-2 px-2 [&>div:not(:first-child)]:mt-2 ">
      {selectedImages.map((image: any, i: number) => (
        <ImageCardClient
          image={image}
          key={i}
          selectedLimit={album.selectedLimit}
        />
      ))}
    </section>
  );
}
