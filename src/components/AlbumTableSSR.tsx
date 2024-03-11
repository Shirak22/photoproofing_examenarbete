import { getAllAlbums } from "@/app/actions";
import { TAlbum } from "@/core/types";

export default async function AlbumTableSSR() {
  const albums = await getAllAlbums("bera123");

  return (
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
            Confirmed
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
            <tr key={album.clientId}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                {album.title}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {album.description}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {album.selectedLimit}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {album.confirmed}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  Edit
                  <span className="sr-only">, {album.title}</span>
                </a>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
