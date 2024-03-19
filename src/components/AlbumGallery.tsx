"use client";

import { useState } from "react";
import ImageCard from "./ImageCard";
import { TAlbum } from "@/core/types";

export default function AlbumGallery({
  images,
  albumData,
  albumId,
}: {
  images: any;
  albumData: TAlbum;
  albumId: string;
}) {
  const [noOfSelectedImages, setNoOfSelectedImages] = useState(
    albumData.noOfSelected
  );
  const SELECTED_LIMIT = albumData.selectedLimit;

  return (
    <>
      {albumData && (
        <p>
          Selected: {noOfSelectedImages} / {SELECTED_LIMIT}
        </p>
      )}
      <section className="flex gap-4 flex-wrap">
        {images &&
          images.map((thumb: any) => (
            <ImageCard
              key={thumb.imageId}
              image={thumb}
              albumId={albumId}
              noOfSelectedImages={noOfSelectedImages}
              selectedLimit={SELECTED_LIMIT}
              setNoOfSelectedImages={setNoOfSelectedImages}
            />
          ))}
      </section>
    </>
  );
}
