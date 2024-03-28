"use client";
import { useGlobalContext } from "@/app/context/store";
import ImageCardClient from "./ImageCardClient";
import { TAlbum } from "@/core/types/types";
import { useEffect } from "react";
import { getAlbumThumbnails } from "@/app/actions/get-actions";

export default function MasonryGrid({ album }: { album: TAlbum }) {
  const { selectedImages, setSelectedImages, setImageArray } =
    useGlobalContext();

  useEffect(() => {
    const updateSelectedImages = async () => {
      const imagesFromDb = await getAlbumThumbnails(album.albumId);
      setImageArray(imagesFromDb || []);
      setSelectedImages(imagesFromDb || []);
    };
    updateSelectedImages();
  }, []);

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
