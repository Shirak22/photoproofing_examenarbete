"use client";
import Hero from "@/components/client-gallery/Hero";
import MasonryGrid from "@/components/client-gallery/MasonryGrid";
import ToggleButton from "@/components/client-gallery/ToggleButton";
import { useState } from "react";

export default function ClientGallery() {
  const [filtered, setFiltered] = useState(false);
  return (
    <>
      <Hero />
      <section
        id="gallery"
        className="flex justify-between p-8 h-28 bg-neutral-50  sticky z-10 top-0 "
      >
        <article className="h-full">
          <h2 className="font-semibold text-2xl">Shirak & Berat</h2>
          <p>Shirak Photography</p>
        </article>
        <article className="flex gap-4 align-middle">
          <div className="flex gap-4">
            <p className="m-auto">Filter Selected</p>
            <ToggleButton />
          </div>
          <p className="m-auto">0/25</p>
          <button className=" bg-neutral-800 px-6  py-3 ml-8 text-white text-sm font-semibold uppercase rounded-full hover:cursor-pointer hover:bg-neutral-700 transition-all duration-240">
            Confirm selection
          </button>
        </article>
      </section>
      <MasonryGrid />
    </>
  );
}
