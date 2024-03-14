import { createClient, getAlbum, getAlbumThumbnails } from "@/app/actions";
import AlbumGrid from "@/components/AlbumGrid";
import DashboardLayout from "@/components/DashboardLayout";
import EmptyState from "@/components/EmptyState";
import UploadFiles from "@/components/uploadFiles";
import Image from "next/image";
import { useFormState } from "react-dom";

export default async function Album({
  params,
}: {
  params: {
    clientId: string;
    albumId: string;
  };
}) {
  const album = await getAlbum(params.albumId);
  const thumbs = await getAlbumThumbnails(params.albumId);
  return (
    <DashboardLayout>
      <h1 className="text-5xl font-bold">{album.title}</h1>
      {/* <AlbumGrid files={files} /> */}
      {/* <EmptyState type="Images" /> */}

      {/* <form action="setForm" >
        <p>{response.message}</p>
        <input type="file" />
        <button type="submit">Upload</button>
      </form> */}
      <UploadFiles albumId={params.albumId} />

      <section className="flex gap-4 flex-wrap">
        {thumbs &&
          thumbs.map((thumb: any) => (
            <div className="">
              <Image
                key={thumb}
                src={thumb}
                alt=""
                width={200}
                height={200}
                className="object-cover h-full rounded-xl"
              />
            </div>
          ))}
      </section>
    </DashboardLayout>
  );
}
