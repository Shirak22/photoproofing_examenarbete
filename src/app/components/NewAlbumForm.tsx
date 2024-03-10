"use client";

import { useFormState } from "react-dom";
import { createAlbum } from "../actions";

const initialState = {
  message: "Send us a message",
};

export default function NewAlbumForm() {
  const [response, setForm] = useFormState(createAlbum, initialState);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-4xl font-bold mb-8">New Album</h1>
      <p>{response.message}</p>
      <form
        className="flex flex-col items-center justify-center w-1/3"
        action={setForm}
      >
        <div className="flex flex-col items-start w-full mb-4">
          <label htmlFor="clientName" className="text-xl font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col items-start w-full mb-4">
          <label htmlFor="address" className="text-xl font-semibold mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col items-start w-full mb-4">
          <label htmlFor="email" className="text-xl font-semibold mb-2">
            Selected limit
          </label>
          <input
            type="number"
            id="selectedLimit"
            name="selectedLimit"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col items-start w-full mb-4">
          <label htmlFor="phone" className="text-xl font-semibold mb-2">
            Proofing
          </label>
          <input
            type="checkbox"
            id="proofing"
            name="proofing"
            defaultChecked={true}
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>
        <button type="submit">Create Album</button>
      </form>
    </div>
  );
}
