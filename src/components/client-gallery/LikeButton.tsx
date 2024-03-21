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
  const [selected, setSelected] = useState(image.selected);
  const { noOfSelectedImages, setNoOfSelectedImages } = useGlobalContext();

  const handleLikeButton = (imageId: string) => {
    if (noOfSelectedImages >= selectedLimit && !selected) {
      return;
    }
    console.log(`Liked image with id: ${imageId}`);
    setSelected(!selected);
    updateSelectedImage(imageId, !selected);
    setNoOfSelectedImages((prev) => (selected ? prev - 1 : prev + 1));
  };
  return (
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
  );
}
