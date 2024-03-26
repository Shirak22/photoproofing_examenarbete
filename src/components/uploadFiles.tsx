"use client";
import { uploadFilesAction } from "@/app/actions";
import UploadFormWrapper from "./UploadFormWrapper";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";

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
      className=" flex max-w-md ml-auto mb-4 relative  "
      onClick={handleClickOutside}
    >
      <button
        className=" bg-gray-800 text-white font-semibold  p-1 text-sm px-4 py-2 rounded-md ml-auto hover:cursor-pointer hover:bg-gray-700"
        onClick={() => setOpen(!open)}
      >
        Upload images
      </button>
      {open && (
        <form
          className="absolute z-10 top-10 rounded-md w-full py-4 px-2 table ml-auto bg-slate-300 "
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
                className="text-xs py-1 px-2 rounded-md bg-slate-300 hover:bg-slate-500 hover:text-white transition duration-100 ease-in-out"
                htmlFor="file"
              >
                Choose..
              </label>
              {selectedFiles && (
                <ul className="bg-slate-500 px-6  py-4 mt-2 rounded-lg ">
                  {Array.from(selectedFiles).map((file, index) => (
                    <li className="text-slate-200 text-xs  " key={index}>
                      {index + "-->" + file.name}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex mt-4">
                <p className="text-xs mt-auto text-slate-500">
                  {" "}
                  {res?.message}{" "}
                </p>
                {selectedFiles && selectedFiles.length > 0 ? (
                  <p className="text-xs mt-auto">
                    {selectedFiles.length} files selected
                  </p>
                ) : (
                  <p> </p>
                )}
                <button
                  className=" text-xs ml-auto  bg-slate-500  p-2 rounded-md text-white hover:bg-slate-500 transition duration-300 ease-in-out"
                  type="submit"
                  onClick={() => setSelectedFiles(null)}
                >
                  upload
                </button>
              </div>
            </UploadFormWrapper>
          </div>
        </form>
      )}
    </div>
  );
}
