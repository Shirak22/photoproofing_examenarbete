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
    // router.push(`/client/${albumId}/${image.imageId}`);
  };

  const handleSelected = () => {
    updateSelectedImage(image.imageId, !selectedImage);
    setSelectedImage(!selectedImage);
  };

  //image properties onClick className src alt width height key
  return (
    <div className="relative bg-white rounded-lg overflow-hidden">
      <div className=" relative h-64 overflow-hidden ">
        <Image
          onClick={handleClick}
          className="object-cover w-full h-full rounded-t-lg hover:cursor-pointer hover:scale-105 transition-transform duration-400 ease-in-out"
          src={image.path}
          alt={image.readableTitle}
          width={200}
          height={200}
        />
        <input
          className="absolute checked:bg-gray-800 bg-transparent h-7 w-10  border-none outline-none focus:checked:bg-slate-200 focus:border-0 hover:checked:bg-gray-900  right-0 top-0 rounded-bl-3xl rounded-tr-lg"
          disabled={true}
          type="checkbox"
          name="selected"
          checked={image.selected}
        />
      </div>
      {/* trim the name if it was more then 70 chars and show it on hover  */}
      <div className="flex text-gray-600 flex-col items-between justify-center  rounded-b-lg p-4 ">
        <p
          className={`text-sm mt-2 cursor-default ${
            image.readableTitle.length > 50
              ? "truncate hover:whitespace-pre-wrap hover:absolute hover:bottom-1 hover:w-64 hover:-translate-x-4 hover:translate-y-4 hover:bg-slate-200 border-spacing-1 hover:z-10 hover:rounded-md hover:p-1 hover:pb-3 "
              : ""
          }`}
        >
          {image.readableTitle}
        </p>
        {image.readableTitle.length > 50 ? (
          <p className="text-xs text-center mt-1 cursor-default">
            ...{" "}
            {image.readableTitle.slice(
              image.readableTitle.length - 20,
              image.readableTitle.length
            )}{" "}
          </p>
        ) : (
          ""
        )}

        <div className="flex justify-between cursor-default mt-4">
          <p className="text-xs text-gray-400 self-end">
            {convertFileSize(image.size)}
          </p>
          <p className="text-xs text-gray-400 hover:text-slate-400 self-end">
            {image.createdDate.toLocaleString("sv", {
              day: "numeric",
              month: "2-digit",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

function convertFileSize(size: number) {
  // return size in KB and MB and GB
  size = size / 1000; //convert to KB
  if (size < 1000) {
    return size.toFixed(2) + "KB";
  } else if (size < 1000000) {
    return (size / 1000).toFixed(2) + "MB";
  } else if (size < 1000000000) {
    return (size / 1000000).toFixed(2) + "GB";
  }
  return "Too large";
}
