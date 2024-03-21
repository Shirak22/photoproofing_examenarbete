"use client";

import { updateSelectedImage } from "@/app/actions";
import { useGlobalContext } from "@/app/context/store";
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
  const { noOfSelectedImages, setNoOfSelectedImages } = useGlobalContext();
  const [selected, setSelected] = useState<boolean>(image.selected);
  const [hovering, setHovering] = useState<number>(0); // Handles LikeButton visibility

  const handleLikeButton = (imageId: string) => {
    if (noOfSelectedImages >= selectedLimit && !selected) {
      return;
    }
    setSelected(!selected);
    updateSelectedImage(imageId, !selected);
    setNoOfSelectedImages((prev) => (selected ? prev - 1 : prev + 1));
  };

  const handleClick = () => {
    router.push(`/client/${image.albumId}/${image.imageId}`);
  };

  return (
    <div
      onMouseEnter={() => setHovering(image.imageId)}
      onMouseLeave={() => setHovering(0)}
      className="relative"
    >
      {hovering === image.imageId && (
        <div
          onClick={() => handleLikeButton(image.imageId)}
          className=" w-16 h-16 absolute rounded-b-lg top-0 right-6 bg-white shadow-xl flex hover:cursor-pointer"
        >
          <img
            src={`${selected ? "/heart-filled.svg" : "/heart.svg"}`}
            alt=""
            className="w-10 h-10 m-auto "
          />
        </div>
      )}
      <img
        onClick={handleClick}
        key={image.imageId}
        src={image.path}
        alt="client-gallery"
        className="w-full object-cover rounded-sm hover:cursor-pointer "
      />
    </div>
  );
}
