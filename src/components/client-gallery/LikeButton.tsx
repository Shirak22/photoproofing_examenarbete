"use client";

import { useState } from "react";

export default function LikeButton({ image }: { image: any }) {
  const [selected, setSelected] = useState(image.selected);

  const handleLikeClick = () => {
    setSelected(!selected);
    // TODO - Update the image in the database
  };
  return (
    <div
      onClick={handleLikeClick}
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
