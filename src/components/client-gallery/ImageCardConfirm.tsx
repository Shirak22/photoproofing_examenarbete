"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ImageCardConfirm({ image }: { image: any }) {
  const router = useRouter();
  const [selected, setSelected] = useState<boolean>(image.selected);

  return (
    <div className="relative">
      <div className=" w-12 h-12 absolute rounded-b-lg top-0 right-4 bg-white shadow-xl flex hover:cursor-pointer">
        <img
          src={`${selected ? "/heart-filled.svg" : "/heart.svg"}`}
          alt=""
          className="w-6 h-6 m-auto "
        />
      </div>
      <img
        key={image.imageId}
        src={image.path}
        alt="client-gallery"
        className="w-full object-cover rounded-sm hover:cursor-pointer "
      />
    </div>
  );
}
