import { getImage } from "@/app/actions";
import Link from "next/link";

export default async function ClientImage({
  params,
}: {
  params: { imageId: string };
}) {
  const image = await getImage(params.imageId);

  return (
    <>
      <div className="h-screen p-24 relative rounded-lg ">
        <Link
          href={`/client/${image?.albumId}`}
          className="bg-neutral-800 px-6  py-3  text-white text-lg rounded-full absolute right-8 top-8 hover:cursor-pointer hover:bg-neutral-700 transition-all duration-240"
        >
          View gallery
        </Link>

        <div className="relative  w-fit mx-auto h-full rounded-lg ">
          <img
            src={image?.path}
            alt=""
            className="w-full h-full mx-auto rounded-md object-contain"
          />
          <p className="text-center mt-6 text-neutral-600 text-lg">
            {image?.readableTitle}
          </p>
        </div>
      </div>
    </>
  );
}
