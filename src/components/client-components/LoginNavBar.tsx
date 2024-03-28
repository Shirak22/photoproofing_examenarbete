"use client";

import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function AuthButton() {
  const { data: session } = useSession();
  const [isClientRoute, setIsClientRoute] = useState(false);

  const path = usePathname();

  useEffect(() => {
    if (path.includes("/client")) setIsClientRoute(true);
    else setIsClientRoute(false);
  }, [path]);

  // UI to show when signed in
  if (session && !isClientRoute) {
    return (
      <div className="flex justify-end gap-8  bg-gray-100 pr-32 pt-8">
        {/* {!isClientRoute && <p>{session?.user?.name}</p>} */}
        <div className="flex items-center ">
          <p className="mr-6  text-base font-medium text-gray-700 group-hover:text-gray-900">
            {session?.user?.name}
          </p>
          <div>
            <Image
              width={48}
              height={48}
              className="inline-block h-12 w-12 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => signOut()}
          className="flex flex-col gap-2"
        >
          <ArrowRightStartOnRectangleIcon className="w-7 h-7 m-auto" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    );
  }

  // UI to show when signed out
  if (!session && !isClientRoute)
    return (
      <div className="flex justify-end gap-8 p-4 bg-gray-100 pr-32 pt-8">
        <button
          type="button"
          onClick={() => signIn()}
          className="flex flex-col gap-2"
        >
          <ArrowRightEndOnRectangleIcon className="w-7 h-7 m-auto" />
          <span className="text-sm">Sign In</span>
        </button>
      </div>
    );
}

export default function LoginNavBar() {
  return <AuthButton />;
}
