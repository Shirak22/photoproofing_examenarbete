"use client";

import { useGlobalContext } from "@/app/context/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SlideshowNavButtons({
  image,
}: {
  image: {
    imageId: string;
    selected: boolean;
    path: string | undefined;
    albumId: string;
  };
}) {
  const { selectedImages } = useGlobalContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(
    selectedImages.findIndex(
      (imageItem: any) => imageItem.imageId === image.imageId
    )
  );

  const getIdOfNextImage = () => {
    if (currentImageIndex === selectedImages.length - 1) {
      return selectedImages[0].imageId;
    } else {
      return selectedImages[currentImageIndex + 1].imageId;
    }
  };

  const getIdOfPrevImage = () => {
    if (currentImageIndex === 0) {
      return selectedImages[selectedImages.length - 1].imageId;
    } else {
      return selectedImages[currentImageIndex - 1].imageId;
    }
  };

  useEffect(() => {
    setCurrentImageIndex(
      selectedImages.findIndex(
        (imageItem: any) => imageItem.imageId === image.imageId
      )
    );
  }, [image]);

  const router = useRouter();
  const handlePrevClick = () => {
    // When hitting the prev button on the first image, it goes to the last image
    router.replace(`/client/${image.albumId}/${getIdOfPrevImage()}`);
    // Does not add modal navigation to history stack
  };

  const handleNextClick = () => {
    // When hitting the next button on the last image, it goes to the first image
    router.replace(`/client/${image.albumId}/${getIdOfNextImage()}`);
    // Does not add modal navigation to history stack
  };

  // Keyboard left and right arrow keys can be used to navigate through the images
  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowLeft") {
      handlePrevClick();
    } else if (e.key === "ArrowRight") {
      handleNextClick();
    }
  };

  // Add event listener for keyboard navigation
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav
      onClick={(e) => e.stopPropagation()}
      className="flex justify-between w-full px-8 z-30 top-1/2 left-0 absolute"
    >
      <button
        onClick={() => handlePrevClick()}
        className="px-3 py-3 rounded-full hover:cursor-pointer hover:scale-110 transition-all duration-240"
      >
        <Image
          width={50}
          height={50}
          src="/nav-arrow.svg"
          alt=""
          className=" rotate-180"
        />
      </button>
      <button
        onClick={() => handleNextClick()}
        className="px-3 py-3 rounded-full hover:cursor-pointer hover:scale-110 transition-all duration-240"
      >
        <Image width={50} height={50} src="/nav-arrow.svg" alt="" />
      </button>
    </nav>
  );
}
