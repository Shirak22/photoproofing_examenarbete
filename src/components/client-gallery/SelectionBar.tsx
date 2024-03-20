"use client";
import ToggleButton from "./ToggleButton";
import { useState } from "react";

export default function SelectionBar({
  title,
  description,
  selectedLimit,
  images,
  className,
}: {
  title?: string;
  description?: string;
  selectedLimit: number;
  images?: any;
  className?: string;
}) {
  const noOfSelectedImages = images.filter(
    (image: any) => image.selected
  ).length;
  const [selected, setSelected] = useState<number[]>(noOfSelectedImages);

  return (
    <section id="gallery" className={className}>
      <article className="h-full">
        <h2 className="font-semibold text-2xl">{title}</h2>
        <p>{description}</p>
      </article>
      <article className="flex gap-4 align-middle">
        <div className="flex gap-4">
          <p className="m-auto">Filter Selected</p>
          <ToggleButton />
        </div>
        <p className="m-auto">
          {selected}/{selectedLimit}
        </p>
        <button className=" bg-neutral-800 px-6  py-3 ml-8 text-white text-sm font-semibold uppercase rounded-full hover:cursor-pointer hover:bg-neutral-700 transition-all duration-240">
          Confirm selection
        </button>
      </article>
    </section>
  );
}
