"use client";
import UploadFormWrapper from "./UploadFormWrapper";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { uploadFilesAction } from "@/app/actions/form-actions";

const initialState = {
  message: "",
};

export default function UploadFiles({ albumId }: { albumId: string }) {
  const [res, formAction] = useFormState(
    async (state: any, formData: FormData) => {
      formData.append("albumId", albumId);
      return uploadFilesAction(state, formData);
    },
    initialState
  );
  const { pending } = useFormStatus();

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  return (
    <div
      className=" flex w-96 ml-auto mb-4 relative"
      onClick={handleClickOutside}
    >
      <button
        className=" bg-gray-800 text-white font-semibold  p-1 text-sm px-4 py-2 rounded-md ml-auto hover:cursor-pointer hover:bg-gray-700"
        onClick={() => setOpen(!open)}
      >
        Add Images
      </button>
      {open && (
        <form
          className="absolute bg-white shadow-xl z-10 top-0  w-full p-8  rounded-2xl"
          action={formAction}
        >
          <div ref={modalRef}>
            <UploadFormWrapper>
              <input
                className=""
                type="file"
                name="file"
                id="file"
                accept="image/png, image/jpg, image/jpeg "
                multiple
                onChange={handleFileChange}
                hidden
              />
              <label
                className="text-sm font-semibold px-4 py-2 rounded-md border-2 border-gray-200   hover:border-gray-300 text-gray-600 bg-gray-50 hover:cursor-pointer transition duration-100 ease-in-out"
                htmlFor="file"
              >
                Choose images
              </label>
              {selectedFiles && selectedFiles.length > 0 ? (
                <ul className="py-6 rounded-lg ">
                  {Array.from(selectedFiles).map((file, index) => (
                    <li className="text-gray-600 text-xs " key={index}>
                      {index + 1 + " --> " + file.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 text-xs py-6">No files selected</p>
              )}
              <div className="flex mt-4">
                <p className="text-xs mt-auto text-slate-500">
                  {" "}
                  {res?.message}{" "}
                </p>
                {selectedFiles && selectedFiles.length > 0 && (
                  <p className="text-xs  text-gray-600 font-semibold mt-auto">
                    {selectedFiles.length} files selected
                  </p>
                )}
                <button
                  className="bg-gray-800 text-white font-semibold  p-1 text-sm px-4 py-2 rounded-md ml-auto hover:cursor-pointer hover:bg-gray-700"
                  type="submit"
                  onClick={() => setSelectedFiles(null)}
                >
                  Upload images
                </button>
              </div>
            </UploadFormWrapper>
          </div>
        </form>
      )}
    </div>
  );
}
