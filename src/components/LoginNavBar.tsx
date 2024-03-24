"use client";

import { signIn, signOut, useSession } from "next-auth/react";
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
  if (session) {
    return (
      <div className="bg-blue-500 flex  justify-end gap-4 p-4">
        {!isClientRoute && <p>{session?.user?.name}</p>}
        <button type="button" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    );
  }

  // UI to show when signed out
  return (
    <div className="bg-blue-500 flex  justify-end gap-4 p-4">
      <button type="button" onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
}

export default function LoginNavBar() {
  return <AuthButton />;
}
