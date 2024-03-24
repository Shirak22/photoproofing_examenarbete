"use client";

import { getAlbum, getClient } from "@/app/actions";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  pathSegments.shift();

  return (
    <nav className="flex ml-10 mb-20" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-3">
        <li>
          <a href="/dashboard" className="text-gray-400 hover:text-gray-200">
            Home
          </a>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/dashboard/${pathSegments
            .slice(0, index + 1)
            .join("/")}`;
          const isCurrent = href === pathname;

          return (
            <li key={segment}>
              <div className="flex items-center">
                {isCurrent ? (
                  <span className="ml-4 text-sm font-medium text-gray-500">
                    {segment}
                  </span>
                ) : (
                  <a
                    href={href}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-300"
                  >
                    {segment}
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
