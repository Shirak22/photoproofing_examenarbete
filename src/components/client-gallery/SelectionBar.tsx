"use client";

import { TAlbum } from "@/core/types";
import ToggleButton from "./ToggleButton";
import { useGlobalContext } from "@/app/context/store";
import { useEffect } from "react";

export default function SelectionBar({
  modal,
  album,
  className,
}: {
  modal?: boolean;
  album: TAlbum;
  className?: string;
}) {
  const { noOfSelectedImages, setNoOfSelectedImages } = useGlobalContext();

  // Update the context to match the album's selected images from DB
  useEffect(() => {
    setNoOfSelectedImages(album.noOfSelected);
  }, [album.noOfSelected]);

  return (
    <section
      onClick={(e) => e.stopPropagation()}
      id="gallery"
      className={className}
    >
      {!modal && (
        <article className="h-full">
          <h2 className="font-semibold text-2xl">{album.title}</h2>
          <p>{album.description}</p>
        </article>
      )}
      <article className="flex gap-4 align-middle">
        {!modal && (
          <div className="flex gap-4">
            <p className="m-auto">Filter Selected</p>
            <ToggleButton />
          </div>
        )}
        <p className="m-auto">
          {noOfSelectedImages}/{album.selectedLimit}
        </p>
        <button className=" bg-neutral-800 px-6  py-3 ml-8 text-white text-sm font-semibold uppercase rounded-full hover:cursor-pointer hover:bg-neutral-700 transition-all duration-240">
          Confirm selection
        </button>
      </article>
    </section>
  );
}
