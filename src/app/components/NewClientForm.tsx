"use client";

import { useFormState } from "react-dom";
import { createClient } from "../actions";

const initialState = {
  message: "Send us a message",
};

export default function NewClientForm() {
  const [response, setForm] = useFormState(createClient, initialState);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-4xl font-bold mb-8">New Client</h1>
      <p>{response.message}</p>
      <form
        className="flex flex-col items-center justify-center w-1/3"
        action={setForm}
      >
        <div className="flex flex-col items-start w-full mb-4">
          <label htmlFor="clientName" className="text-xl font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col items-start w-full mb-4">
          <label htmlFor="address" className="text-xl font-semibold mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col items-start w-full mb-4">
          <label htmlFor="email" className="text-xl font-semibold mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col items-start w-full mb-4">
          <label htmlFor="phone" className="text-xl font-semibold mb-2">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>
        <button type="submit">Add Client</button>
      </form>
    </div>
  );
}
