"use client";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import ImageCardDashboard from "./ImageCardDashboard";
import Link from "next/link";
import UploadFiles from "./uploadFiles";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardGallery(params: {
  thumbs: any;
  albumId: string;
}) {
  const [enabled, setEnabled] = useState(false);
  const thumbs = params.thumbs;
  return (
    <>
      <div className="p-16 bg-white rounded-2xl">
        <div className="sm:flex sm:items-center mb-10">
          <div className="sm:flex-auto">
            <h1 className="text-3xl  font-bold text-gray-800">Image gallery</h1>
            <p className="mt-2 text-gray-500">
              A list of all the images in this album
            </p>
          </div>
          <UploadFiles albumId={params.albumId} />
        </div>
        <div className="flex items-center justify-end  py-4 ">
          <p className="text-sm mr-2">Filter selected:</p>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={classNames(
              enabled ? "bg-gray-800" : "bg-gray-200",
              "my-auto relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  focus:ring-neutral-600 "
            )}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={classNames(
                enabled ? "translate-x-[26px]" : "translate-x-[4px]",
                "my-auto pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              )}
            />
          </Switch>
        </div>
        <section className="bg-gray-100 rounded-2xl p-6 grid grid-cols-5 gap-x-3 gap-y-12 justify-start flex-wrap h-full">
          {thumbs && enabled
            ? thumbs
                .filter((image: any) => image.selected)
                .map((image: any) => (
                  <ImageCardDashboard
                    key={image.imageId}
                    image={image}
                    albumId={params.albumId}
                  />
                ))
            : thumbs.map((image: any) => (
                <ImageCardDashboard
                  key={image.imageId}
                  image={image}
                  albumId={params.albumId}
                />
              ))}
        </section>
      </div>
    </>
  );
}
