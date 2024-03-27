import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Footer({ photographer }: { photographer: any }) {
  const year = new Date().getFullYear();
  return (
    <section className="w-full p-24 bg-gray-50 mt-3 flex flex-col">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl font-bold tracking-widest uppercase">
            {photographer.companyName}
          </h3>
          <p className="text-lg">{photographer.address}</p>
          <div className="flex h-fit w-fit gap-3 bg-gray-900 px-4 py-2 rounded-full hover:cursor-pointer mt-4">
            <Link
              href={`mailto:${photographer.email}`}
              className=" text-sm text-gray-200 my-auto"
            >
              {photographer.email}
            </Link>
          </div>
        </div>
        <p className="text-xs leading-5 text-gray-500 ">
          &copy; {year} {photographer.companyName} Inc. All rights reserved.
        </p>
      </div>
    </section>
  );
}
