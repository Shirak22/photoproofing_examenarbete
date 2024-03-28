"use client";

import { useFormState } from "react-dom";
import {
  UserIcon,
  HomeModernIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { createClient } from "@/app/actions/form-actions";

const initialState = {
  message: "",
};

export default function NewClientForm() {
  const [response, setForm] = useFormState(createClient, initialState);

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
                htmlFor="name"
                className="my-auto text-sm w-fit font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <UserIcon className="my-auto h-6 w-6 text-gray-400 absolute right-2 -bottom-10" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Smith"
              className=" col-span-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="px-12 py-3  gap-22  w-full ">
            <div className="flex gap-3 mb-2 relative">
              <label
                htmlFor="address"
                className="my-auto text-sm w-fit font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <HomeModernIcon className="my-auto h-6 w-6 text-gray-400 absolute right-2 -bottom-10" />
            </div>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="123 Wall St."
              className="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="px-12 py-3 gap-22  w-full ">
            <div className="flex justify-between gap-3 mb-2 relative">
              <label
                htmlFor="email"
                className="my-auto text-sm w-fit font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <EnvelopeIcon className=" my-auto h-6 w-6 text-gray-400 absolute right-2 -bottom-10" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              className="col-span-2  w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="px-12 py-3 gap-22  w-full ">
            <div className="flex justify-between gap-3 mb-2 relative">
              <label
                htmlFor="phone"
                className="my-auto text-sm w-fit font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <DevicePhoneMobileIcon className="my-auto h-6 w-6 text-gray-400 absolute right-2 -bottom-10" />
            </div>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="555-555-5555"
              className="col-span-2  w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <p className="bg-gray-50 h-full text-sm text-gray-400 p-12">
          New clients will be saved to your client list. You can view and manage
          them from your dashboard.
        </p>
        <div className="p-6 pl-12 grid grid-cols-3">
          <p className="col-span-2 text-sm text-gray-500 my-auto">
            {response.message}
          </p>

          <button
            type="submit"
            className="col-span-1 ml-auto justify-center  rounded-lg bg-gray-800 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Add client
          </button>
        </div>
      </form>
    </div>
  );
}
