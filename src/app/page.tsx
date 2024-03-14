import NewClientForm from "@/components/NewClientForm";
import { getImageUrl } from "@/services/S3/upload-tools";
import Image from "next/image";
import { getAlbumThumbnails } from "./actions";

export default async function Home() {
  const thumbs = await getAlbumThumbnails(
    "d0244573-7516-400d-8912-7b41921cd424"
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">Hello World</h1>
      <NewClientForm />

      {thumbs &&
        thumbs.map((thumb: any) => (
          <Image key={thumb} src={thumb} alt="" width={300} height={300} />
        ))}
      {/* <NewAlbumForm /> */}
    </main>
  );
}
