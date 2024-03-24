"use client";

import LikeButton from "./LikeButton";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/store";

export default function ModalImage({
  image,
  selectedLimit,
}: {
  image: any;
  selectedLimit: number;
}) {
  const { selectedImages } = useGlobalContext();
  // Sets the currentimage to the thumbnail with matching id
  const [currentImage, setCurrentImage] = useState<any>(
    selectedImages.find(
      (selectedImage) => selectedImage.imageId === image.imageId
    )
  );

  useEffect(() => {
    const newImage = selectedImages.find(
      (selectedImage) => selectedImage.imageId === image.imageId
    );
    setCurrentImage(newImage);
  }, [selectedImages]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="h-full p-8 relative rounded-lg "
    >
      <div className="relative w-fit mx-auto h-full rounded-lg ">
        {currentImage && (
          // CurrentImage handles the like button
          <LikeButton image={currentImage} selectedLimit={selectedLimit} />
        )}

        <img
          // Renders out large image with Watermark
          src={image?.path}
          alt=""
          className="w-full h-full mx-auto rounded-md object-contain"
        />
        <p className="text-center mt-6 text-neutral-600 text-lg">
          {currentImage.readableTitle}
        </p>
      </div>
    </div>
  );
}
