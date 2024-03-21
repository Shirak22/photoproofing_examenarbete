"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SlideshowNavButtons({
  image,
  albumImages,
}: {
  image: {
    imageId: string;
    selected: boolean;
    path: string | undefined;
    albumId: string;
  };
  albumImages: any;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    albumImages.findIndex(
      (imageItem: any) => imageItem.imageId === image.imageId
    )
  );

  const getIdOfNextImage = () => {
    if (currentImageIndex === albumImages.length - 1) {
      return albumImages[0].imageId;
    } else {
      return albumImages[currentImageIndex + 1].imageId;
    }
  };

  const getIdOfPrevImage = () => {
    if (currentImageIndex === 0) {
      return albumImages[albumImages.length - 1].imageId;
    } else {
      return albumImages[currentImageIndex - 1].imageId;
    }
  };

  useEffect(() => {
    setCurrentImageIndex(
      albumImages.findIndex(
        (imageItem: any) => imageItem.imageId === image.imageId
      )
    );
  }, [image]);

  const router = useRouter();
  const handlePrevClick = () => {
    // When hitting the prev button on the first image, it goes to the last image
    router.push(`/client/${image.albumId}/${getIdOfPrevImage()}`);
  };

  const handleNextClick = () => {
    // When hitting the next button on the last image, it goes to the first image
    router.push(`/client/${image.albumId}/${getIdOfNextImage()}`);
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
    <nav className="flex justify-between w-full px-8  z-10 top-1/2 left-0 absolute">
      <button
        onClick={() => handlePrevClick()}
        className="px-3 py-3 rounded-full hover:cursor-pointer hover:scale-110 transition-all duration-240"
      >
        <img src="/nav-arrow.svg" alt="" className=" rotate-180" />
      </button>
      <button
        onClick={() => handleNextClick()}
        className="px-3 py-3 rounded-full hover:cursor-pointer hover:scale-110 transition-all duration-240"
      >
        <img src="/nav-arrow.svg" alt="" />
      </button>
    </nav>
  );
}
