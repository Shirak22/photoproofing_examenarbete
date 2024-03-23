"use client";

import { updateSelectedImage } from "@/app/actions";
import { useGlobalContext } from "@/app/context/store";
import { useState } from "react";

export default function LikeButton({
  image,
  selectedLimit,
}: {
  image: {
    imageId: string;
    selected: boolean;
    path: string | undefined;
    albumId: string;
  };
  selectedLimit: number;
}) {
  const {
    noOfSelectedImages,
    setNoOfSelectedImages,
    selectedImages,
    setSelectedImages,
    setImageArray,
  } = useGlobalContext();

  const currentImage = selectedImages.find(
    (selectedImage) => selectedImage.imageId === image.imageId
  );

  const handleLikeButton = (imageId: string) => {
    if (noOfSelectedImages >= selectedLimit && !currentImage.selected) {
      return;
    }
    console.log(`Liked image with id: ${imageId}`);
    setSelectedImages((prev) =>
      prev.map((selectedImage) =>
        selectedImage.imageId === imageId
          ? { ...selectedImage, selected: !currentImage.selected }
          : selectedImage
      )
    );
    updateSelectedImage(imageId, !currentImage.selected); // Update the image in the database
    setNoOfSelectedImages((prev) =>
      currentImage.selected ? prev - 1 : prev + 1
    ); // Update the number of selected images
    setImageArray((prev) =>
      prev.map((image) =>
        image.imageId === imageId
          ? { ...image, selected: !currentImage.selected }
          : image
      )
    );
  };
  return (
    <div
      onClick={() => handleLikeButton(image.imageId)}
      className=" w-16 h-16 absolute rounded-b-lg top-0 right-6 bg-white shadow-xl flex hover:cursor-pointer"
    >
      <img
        src={`${currentImage.selected ? "/heart-filled.svg" : "/heart.svg"}`}
        alt=""
        className="w-10 h-10 m-auto "
      />
    </div>
  );
}
