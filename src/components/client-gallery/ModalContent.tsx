"use client";

import LikeButton from "./LikeButton";

export default function ModalContent({ image }: { image: any }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="h-full p-8 relative rounded-lg "
    >
      <div className="relative w-fit mx-auto h-full rounded-lg ">
        <LikeButton image={image} />
        <img
          src={image?.path}
          alt=""
          className="w-full h-full mx-auto rounded-md object-contain"
        />
        <p className="text-center mt-6 text-neutral-600 text-lg">Image name</p>
      </div>
    </div>
  );
}
