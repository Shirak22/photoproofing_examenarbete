import Link from "next/link";

export default function EmptyState({
  type,
  route,
}: {
  type: string;
  route: string;
}) {
  return (
    <div className="mt-24 p-12 rounded-2xl text-center flex flex-col items-center border-2 border-dashed border-gray-300  max-w-lg mx-auto ">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No {type}</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new {type}.
      </p>
      {type === "Images" ? (
        <form className="mt-6 flex flex-col gap-4  items-center ">
          <input
            type="file"
            className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold  shadow-sm "
          />
          <Link
            href={route}
            className="inline-flex items-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
          >
            Upload {type}
          </Link>
        </form>
      ) : (
        <Link
          href={route}
          className="mt-4 rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
        >
          Add new {type}
        </Link>
      )}
    </div>
  );
}
