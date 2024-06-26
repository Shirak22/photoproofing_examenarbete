"use client";

import { updateSelectedImage } from "@/app/actions/update-actions";
import { useGlobalContext } from "@/app/context/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ImageCardClient({
  image,
  selectedLimit,
}: {
  image: any;
  selectedLimit: number;
}) {
  const router = useRouter();
  const {
    noOfSelectedImages,
    setNoOfSelectedImages,
    selectedImages,
    setSelectedImages,
    setImageArray,
    confirmedAlbum,
  } = useGlobalContext();

  const [hovering, setHovering] = useState<number>(0); // Handles LikeButton visibility
  const currentImage = selectedImages.find(
    (selectedImage) => selectedImage.imageId === image.imageId
  );

  const handleLikeButton = (imageId: string) => {
    if (confirmedAlbum) return; // If the album has been confirmed, do nothing
    if (noOfSelectedImages >= selectedLimit && !currentImage.selected) {
      return;
    }
    setSelectedImages((prev) =>
      prev.map((selectedImage) =>
        selectedImage.imageId === imageId
          ? { ...selectedImage, selected: !currentImage.selected }
          : selectedImage
      )
    );
    updateSelectedImage(imageId, !currentImage.selected);
    setNoOfSelectedImages((prev) =>
      currentImage.selected ? prev - 1 : prev + 1
    );
    setImageArray((prev) =>
      prev.map((image) =>
        image.imageId === imageId
          ? { ...image, selected: !currentImage.selected }
          : image
      )
    );
  };

  const handleClick = () => {
    router.push(`/client/${image.albumId}/${image.imageId}`);
  };

  return (
    <div
      onMouseEnter={() => setHovering(image.imageId)}
      onMouseLeave={() => setHovering(0)}
      className="relative bg-white"
    >
      {hovering === image.imageId && (
        <div
          onClick={() => handleLikeButton(image.imageId)}
          className=" w-16 h-16 absolute rounded-b-lg top-0 right-6 bg-white shadow-xl flex hover:cursor-pointer"
        >
          <Image
            width={40}
            height={40}
            src={`${
              currentImage.selected ? "/heart-filled.svg" : "/heart.svg"
            }`}
            alt=""
            className="w-10 h-10 m-auto "
          />
        </div>
      )}
      <Image
        width={1920}
        height={1080}
        onClick={handleClick}
        key={image.imageId}
        src={image.path}
        alt="client-gallery"
        className="w-full object-cover rounded-sm hover:cursor-pointer "
      />
    </div>
  );
}
