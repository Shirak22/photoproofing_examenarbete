"use client";

import { signIn } from "next-auth/react";


const initialState = {
  message: "Password",
};

export default function ClientPasswordInput({ albumId }: { albumId: string }) {


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    signIn("credentials", {
      albumId,
      password,
      callbackUrl: "/client/"+albumId,
    });

}
  
  return (
    <div className="flex items-center justify-center h-svh bg-slate-400">
      <form onSubmit={handleSubmit}>
        <input
          className="h-12"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <button className="h-12 bg-red-200 hover:bg-blue-200" type="submit">
          Submit
          </button>
      </form>
    </div>
  );
}
