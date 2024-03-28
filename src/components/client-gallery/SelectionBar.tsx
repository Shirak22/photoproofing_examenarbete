"use client";

import { TAlbum, TImage, TThumbnail } from "@/core/types/types";
import ToggleButton from "./ToggleButton";
import { useGlobalContext } from "@/app/context/store";
import { useEffect, useState } from "react";
import ModalConfirm from "./ModalConfirm";
import { confirmAlbumSelection } from "@/app/actions/update-actions";

export default function SelectionBar({
  inModal,
  album,
  className,
}: {
  inModal?: boolean;
  album: TAlbum;
  className?: string;
}) {
  const {
    noOfSelectedImages,
    setNoOfSelectedImages,
    setConfirmedAlbum,
    confirmedAlbum,
  } = useGlobalContext();
  const [open, setOpen] = useState(false);
  // Update the context to match the album's selected images from DB
  useEffect(() => {
    setNoOfSelectedImages(album.noOfSelected);
    setConfirmedAlbum(album.confirmed);
  }, []);

  const handleConfirm = async () => {
    confirmAlbumSelection(album.albumId); // Updates the DB
    setConfirmedAlbum(true); // Handles the UI state
    setOpen(false);
  };

  return (
    <section
      onClick={(e) => e.stopPropagation()}
      id="gallery"
      className={className}
    >
      {!inModal && (
        <article className="h-full">
          <h2 className="font-semibold text-2xl">{album.title}</h2>
          <p>{album.description}</p>
        </article>
      )}
      <article className="flex gap-4 align-middle">
        {!inModal && (
          <div className="flex gap-4">
            <p className="m-auto">Filter Selected</p>
            <ToggleButton albumId={album.albumId} />
          </div>
        )}
        <p className="m-auto">
          {noOfSelectedImages}/{album.selectedLimit}
        </p>
        <button
          disabled={confirmedAlbum}
          onClick={() => setOpen(true)}
          // href={`/client/${album.albumId}/confirm`}
          className=" bg-neutral-800 px-6  py-3 ml-8 text-white text-sm font-semibold uppercase rounded-full hover:cursor-pointer hover:bg-neutral-700 transition-all duration-240"
        >
          {`${confirmedAlbum ? "Selection locked" : "Confirm selection"}`}
        </button>
        <ModalConfirm open={open} setOpen={setOpen}>
          <article
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col gap-4 bg-white rounded-2xl px-20 py-8"
          >
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <div className="mt-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Confirm Selection
                  </h2>
                  <p className="text-sm text-gray-500">
                    Are you sure you want to confirm your selection?
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm m-auto text-gray-500">
              You have selected {noOfSelectedImages}/{album.selectedLimit}{" "}
              images
            </p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </article>
        </ModalConfirm>
      </article>
    </section>
  );
}
