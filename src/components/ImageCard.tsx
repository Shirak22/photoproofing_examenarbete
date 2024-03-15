"use client";

import { updateSelectedImage } from "@/app/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ImageCard({
  image,
  albumId,
}: {
  image: {
    path: string;
    imageId: string;
    selected: boolean;
  };
  albumId: string;
}) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(image.selected);

  const handleClick = () => {
    router.push(`/client/${albumId}/${image.imageId}`);
  };

  const handleSelected = () => {
    updateSelectedImage(image.imageId, !selectedImage);

    setSelectedImage(!selectedImage);
  };

  return (
    <div className="bg-neutral-400">
      <div className="flex gap-5">
        <p>Selected: </p>
        <input
          type="checkbox"
          name="selected"
          id="selected"
          checked={selectedImage}
          onChange={handleSelected}
        />
      </div>
      <Image
        onClick={handleClick}
        key={image.imageId}
        src={image.path}
        alt=""
        width={200}
        height={200}
        className="object-cover h-full rounded-xl hover:cursor-pointer hover:opacity-80"
      />
    </div>
  );
}
