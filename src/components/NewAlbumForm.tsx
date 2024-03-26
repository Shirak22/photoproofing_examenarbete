"use client";

import { useFormState } from "react-dom";
import { createAlbum } from "../app/actions";
import {
  UserIcon,
  HomeModernIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  DocumentIcon,
  DocumentTextIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import ToggleButton from "./client-gallery/ToggleButton";
import { Switch } from "@headlessui/react";

export default function NewAlbumForm({ clientId }: { clientId: string }) {
  const initialState = {
    message: "",
    clientId: clientId,
  };

  const [response, setForm] = useFormState((state: any, formData: any) => {
    // Adjusted to match expected signature
    // Directly calling createAlbum with both state and formData
    return createAlbum(state, formData);
  }, initialState);

  return (
    <div className="flex flex-col h-full w-[35rem]">
      <div className="bg-gray-900 p-12">
        <h1 className="text-xl font-semibold text-white">New Client</h1>
        <p className="text-gray-400">
          Fill in the information below to create a new client.
        </p>
      </div>
      <form className="w-full flex h-full flex-col" action={setForm}>
        <div className="flex flex-col my-12">
          <div className="px-12 py-3 gap-22 w-full ">
            <div className="flex gap-3 mb-2 relative">
              <label
                htmlFor="title"
                className="my-auto text-sm w-fit font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <DocumentIcon className="my-auto h-6 w-6 text-gray-400 absolute right-2 -bottom-10" />
            </div>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="John & Jane's Wedding"
              className=" col-span-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="px-12 py-3  gap-22  w-full ">
            <div className="flex gap-3 mb-2 relative">
              <label
                htmlFor="description"
                className="my-auto text-sm w-fit font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <DocumentTextIcon className="my-auto h-6 w-6 text-gray-400 absolute right-2 -bottom-10" />
            </div>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="A beautiful wedding in the countryside"
              className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="px-12 py-3 gap-22  w-full ">
            <div className="flex justify-between gap-3 mb-2 relative">
              <label
                htmlFor="selectedLimit"
                className="my-auto text-sm w-fit font-medium leading-6 text-gray-900"
              >
                Selected limit
              </label>
              <ChartPieIcon className=" my-auto h-6 w-6 text-gray-400 absolute right-2 -bottom-10" />
            </div>
            <input
              type="number"
              id="selectedLimit"
              name="selectedLimit"
              placeholder="25"
              className="col-span-2  w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className=" flex justify-between items-center px-12 py-3 w-full pb-0 gap-8">
            <div className="flex flex-col gap-2 mb-2 relative">
              <label
                htmlFor="proofing"
                className="my-auto text-sm w-fit font-medium leading-6 text-gray-900 hover:cursor-pointer"
              >
                Proofing
              </label>
              <label
                className="text-gray-400 text-sm mb-2 hover:cursor-pointer"
                htmlFor="proofing"
              >
                This enables proofing for your album.
              </label>
            </div>
            <input
              type="checkbox"
              defaultChecked={true}
              id="proofing"
              name="proofing"
              placeholder="555-555-5555"
              className=" w-8 h-8 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 hover:cursor-pointer"
            />
          </div>
        </div>
        <section className="px-12 pt-10 pb-12 flex flex-col gap-6 border-t-4 border-gray-50 ">
          <h3 className="font-semibold text-gray-900">Privacy</h3>
          <div className="relative flex items-start">
            <div className="absolute flex h-6 items-center">
              <input
                id="restricted-access"
                name="privacy"
                aria-describedby="restricted-access-description"
                type="radio"
                className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-600"
              />
            </div>
            <div className="pl-7 text-sm leading-6">
              <label
                htmlFor="restricted-access"
                className="font-medium text-gray-900"
              >
                Private to your Client
              </label>
              <p id="restricted-access-description" className="text-gray-500">
                Only the client of this album would be able to access
              </p>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="absolute flex h-6 items-center">
              <input
                id="private-access"
                name="privacy"
                aria-describedby="private-access-description"
                type="radio"
                className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-600"
              />
            </div>
            <div className="pl-7 text-sm leading-6">
              <label
                htmlFor="private-access"
                className="font-medium text-gray-900"
              >
                Private to you
              </label>
              <p id="private-access-description" className="text-gray-500">
                You are the only one able to access this album
              </p>
            </div>
          </div>
        </section>
        <p className="bg-gray-50 h-full text-sm text-gray-400 p-12">
          The album will be saved to this specific client. You can view and
          manage all your albums from your dashboard.
        </p>

        <div className="p-6 pl-12 grid grid-cols-3">
          <p className="col-span-2 text-sm text-gray-500 my-auto">
            {response.message}
          </p>

          <button
            type="submit"
            className="col-span-1 ml-auto justify-center  rounded-lg bg-gray-800 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Add album
          </button>
        </div>
      </form>
    </div>
  );
}
