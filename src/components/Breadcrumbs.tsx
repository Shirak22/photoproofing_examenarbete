"use client";

import { BreadcrumbsNameCheck } from "@/app/actions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [segmentNames, setSegmentNames] = useState<
    { name: string; href: string }[]
  >([]);

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  pathSegments.shift();

  useEffect(() => {
    const fetch = async () => {
      const response = await BreadcrumbsNameCheck(pathSegments);
      setSegmentNames(response as any);
    };
    fetch();
  }, [pathname]);

  return (
    <nav className="flex ml-2 " aria-label="Breadcrumb">
      <ol role="list" className="flex items-center ">
        <li>
          <a href="/dashboard" className=" text-gray-400 hover:text-gray-200">
            Home |
          </a>
        </li>
        {segmentNames &&
          segmentNames.map((segment, index) => {
            const isCurrent = segment.href === pathname;
            return (
              <li key={segment.name}>
                <div className="flex items-center">
                  {isCurrent ? (
                    <span className="ml-2 text-sm font-medium text-gray-500">
                      {" -> " + segment.name}
                    </span>
                  ) : (
                    <a
                      href={segment.href}
                      className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-300"
                    >
                      {segment.name}
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

// {pathSegments.map((segment, index) => {
//   const href = `/dashboard/${pathSegments
//     .slice(0, index + 1)
//     .join("/")}`;
//   const isCurrent = href === pathname;

//   return (
//     <li key={segment}>
//       <div className="flex items-center">
//         {isCurrent ? (
//           <span className="ml-4 text-sm font-medium text-gray-500">
//             {segment}
//           </span>
//         ) : (
//           <a
//             href={href}
//             className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-300"
//           >
//             {segment}
//           </a>
//         )}
//       </div>
//     </li>
//   );
// })}
