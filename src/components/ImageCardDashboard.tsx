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


  //image properties onClick className src alt width height key 
  return (
    <div className="relative h-60 w-56  my-4">
      <div className="bg-white  overflow-hidden relative">
        <Image
          className="object-cover h-48 w-56 "
          src={image.path}
          alt={image.readableTitle}
          width={200}
          height={200}
        />
        <input className="absolute checked:bg-slate-700 bg-slate-200 border-none outline-none focus:checked:bg-slate-200 focus:border-0 hover:checked:bg-slate-300  right-0 top-0" disabled={true} type="checkbox" name="selected" checked={image.selected} />
      </div>
      {/* trim the name if it was more then 70 chars and show it on hover  */}
      <div className="flex flex-col items-between justify-center ">
        <p
          className={`text-xs font-sans  text-center mt-1 cursor-default ${
            image.readableTitle.length > 70
              ? "truncate hover:whitespace-pre-wrap hover:absolute hover:bottom-1 hover:bg-slate-300 hover:z-10 hover:rounded-b-md hover:p-1 hover:pb-3 hover:max-w-"
              : ""
          }`}
        >
          {image.readableTitle}
        </p>
        {image.readableTitle.length > 70 ? (
          <p className="text-xs font-sans  text-center mt-1 cursor-default">
            ...{" "}
            {image.readableTitle.slice(
              image.readableTitle.length - 20,
              image.readableTitle.length
            )}{" "}
          </p>
        ) : (
          ""
        )}

        <div className="flex justify-between mt-2">
        <p className="text-xs text-slate-400 self-end">
            {convertFileSize(image.size)}
          </p>
          <p className="text-xs text-slate-400 self-end">
            {image.createdDate.toLocaleString("sv")}
          </p>
          
        </div>
      </div>
    </div>
  );
}




// {/* <div>
//         <p>{(image.size / 1000000).toFixed(2)}MB</p>
//         <p>{image.readableTitle}</p>
//         <p>{image.extension}</p>
//         <p>{image.createdDate.toLocaleString("sv")}</p>
//       </div> */}

function convertFileSize(size: number){
  // return size in KB and MB and GB
  size = size / 1000; //convert to KB
  if(size < 1000){
    return size.toFixed(2) + "KB";
  }else if(size < 1000000){
    return (size / 1000).toFixed(2) + "MB";
  }else if(size < 1000000000){
    return (size / 1000000).toFixed(2) + "GB";
  }
  return "Too large";
}