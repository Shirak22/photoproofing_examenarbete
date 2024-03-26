"use client";

import { signIn, SignInResponse } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function AuthLogin() {
  const [results, setResults] = useState<SignInResponse>();

  //beacuse we are using the client side, we can use the URLSearchParams to get the albumId from the URL
  //we use the if statement to check if the window object is available, if not we set the albumId to null
  //beacuse the window object is not available on the server side
  let useSearchParams;
  if (typeof window !== "undefined") {
    useSearchParams = new URLSearchParams(window.location.search);
  }

  const albumId = useSearchParams ? useSearchParams.get("albumId") : null; //get albumId from URL

  const handleCredentialsForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    // Sign in with credentials
    const results = await signIn("Client Login", {
      password,
      albumId,
      redirect: false,
    });

    setResults(results);
  };

  useEffect(() => {
    console.log(results);

    //chech if the results object is available and if the ok property is true
    if (results && results.ok) {
      redirect(`/client/${albumId}`);
    } else if (results && !results.ok) {
      alert("Invalid password");
    }
  }, [results]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleCredentialsForm}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
