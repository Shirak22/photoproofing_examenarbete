import { calcAlbumDiskUsage, getAllAlbums } from "@/app/actions";
import { TAlbum } from "@/core/types";
import Link from "next/link";
import EmptyState from "./EmptyState";

export default async function AlbumTableSSR({
  clientId,
}: {
  clientId: string;
}) {
  const albums = await getAllAlbums(clientId);

  return (
    <>
      {albums && Array.isArray(albums) && albums.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                SelectedLimit
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Shareable link
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Password
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                DiskUsage
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {albums &&
              Array.isArray(albums) &&
              albums.map((album: TAlbum) => (
                <tr key={album.albumId}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <Link
                      href={`/dashboard/${album.clientId}/${album.albumId}`}
                    >
                      {album.title}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {album.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {album.selectedLimit}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <Link href={album.albumUrl}>{album.albumUrl}</Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {album.password}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    Album size
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                      <span className="sr-only">, {album.title}</span>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <EmptyState type="Album" />
      )}
    </>
  );
}
