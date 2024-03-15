"use client";

import { updateSelectedImage } from "@/app/actions";
import { TImage } from "@/core/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ImageCardDashboard({
  image,
  albumId,
}: {
  image: TImage;
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
      <div>
        <p>{(image.size / 1000000).toFixed(2)}MB</p>
        <p>{image.readableTitle}</p>
        <p>{image.extension}</p>
        <p>{image.createdDate.toLocaleString()}</p>
      </div>
    </div>
  );
}
