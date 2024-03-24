import { getAlbum, getAlbumThumbnails } from "@/app/actions";
import ImageCardConfirm from "@/components/client-gallery/ImageCardConfirm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ConfirmPage({
  params,
}: {
  params: { albumId: string };
}) {
  const thumbs = await getAlbumThumbnails(params.albumId);
  const album = await getAlbum(params.albumId);

  const session = await getServerSession();
  if (!session || session?.user?.name !== params.albumId)
    return redirect(`/client/login?albumId=${params.albumId}`);

  return (
    <div className="flex flex-col justify-center align-middle max-w-7xl  m-auto">
      <h1 className="text-4xl">Album Summary</h1>
      <section className="columns-4 gap-2 px-2 [&>div:not(:first-child)]:mt-2 bg-blue-200">
        {thumbs &&
          thumbs.map((image: any, i: number) => (
            <ImageCardConfirm image={image} key={i} />
          ))}
      </section>
      <button className="bg-blue-500 text-white p-2 rounded-md m-2">
        Confirm selection
      </button>
    </div>
  );
}
