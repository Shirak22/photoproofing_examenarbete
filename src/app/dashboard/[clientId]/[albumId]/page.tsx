import {
  calcAlbumDiskUsage,
  getAlbum,
  getAlbumThumbnails,
} from "@/app/actions";
import {
  DocumentDuplicateIcon,
  LockOpenIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import DashboardGallery from "@/components/DashboardGallery";
import UploadFiles from "@/components/uploadFiles";
export default async function Album({
  params,
}: {
  params: {
    clientId: string;
    albumId: string;
  };
}) {
  const thumbs = await getAlbumThumbnails(params.albumId);
  const album = await getAlbum(params.albumId);
  const albumSize = await calcAlbumDiskUsage(params.albumId);

  console.log(thumbs);

  const stats = [
    {
      name: "Total images",
      value: thumbs ? thumbs.length : 0,
    },
    { name: "Total size", value: albumSize },
    {
      name: "Selection limit",
      value: album.selectedLimit,
    },
    {
      name: "Selected images",
      value: album.noOfSelected,
    },
  ];

  const handleConfirmed = () => {
    if (album.confirmed) {
      return "Confirmed";
    } else {
      return "Not Confirmed";
    }
  };

  const stats2 = [
    {
      title: "Album type",
      value: album.proofing ? "Proofing" : "Delivery",
    },
    {
      title: "Selection status",
      value: handleConfirmed(),
    },
    {
      title: "Password",
      value: <>{album.password}</>,
    },
    {
      title: "Shareable link",
      value: <DocumentDuplicateIcon className="h-6 w-6" />,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 mb-6 mt-12">
        <div className="px-24 py-10 bg-white rounded-2xl flex flex-col justify-center gap-2">
          <h1 className="text-5xl font-bold">{album.title}</h1>
          <p className="text-2xl text-gray-500">{album.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className=" bg-white px-4 py-6 sm:px-6 lg:px-8 rounded-2xl flex flex-col gap-8"
            >
              <p className="text-sm font-medium leading-6 text-gray-600">
                {stat.name}
              </p>
              <p className=" flex items-baseline gap-x-4 mt-auto ">
                <span className="text-6xl font-semibold tracking-tight text-gray-800">
                  {stat.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className=" gap-6 mb-6">
        <div className="grid grid-cols-4 gap-6">
          {stats2.map((stat, i) => (
            <div
              key={i}
              className=" bg-white px-4 py-6 sm:px-6 lg:px-8 rounded-2xl flex flex-col gap-8"
            >
              <p className="flex items-center justify-between gap-x-4 mt-auto ">
                <span className="text-lg font-semibold tracking-tight text-gray-800">
                  {stat.title}
                </span>
                <span className=" bg-blue-50 border-[1px] border-gray-200 py-2 px-4 rounded-full text-sm font-semibold tracking-tight text-gray-600 flex gap-2 justify-center items-center">
                  {stat.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
      {thumbs ? (
        <DashboardGallery thumbs={thumbs} albumId={params.albumId} />
      ) : (
        <UploadFiles albumId={params.albumId} />
      )}
    </div>
  );
}
