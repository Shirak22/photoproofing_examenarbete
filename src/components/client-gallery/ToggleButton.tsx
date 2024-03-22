"use client";

import { Switch } from "@headlessui/react";
import { useGlobalContext } from "@/app/context/store";
import { TImage } from "@/core/types";
import { useEffect, useState } from "react";
import { getAlbumThumbnails } from "@/app/actions";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ToggleButton({ albumId }: { albumId: string }) {
  const [enabled, setEnabled] = useState(false);
  const { noOfSelectedImages, setSelectedImages } = useGlobalContext();

  useEffect(() => {
    const updateSelectedImages = async () => {
      const imagesFromDb = await getAlbumThumbnails(albumId);
      if (enabled) {
        const selectedImagesFromDB = imagesFromDb?.filter(
          (image) => image.selected
        );
        setSelectedImages(selectedImagesFromDB || []);
      } else {
        setSelectedImages(imagesFromDb || []);
      }
    };
    updateSelectedImages();
  }, [enabled]);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        enabled ? "bg-neutral-900" : "bg-neutral-300",
        "my-auto relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2"
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? "translate-x-5" : "translate-x-0",
          "my-auto pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        )}
      />
    </Switch>
  );
}
