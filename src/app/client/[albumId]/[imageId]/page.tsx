import { getImage } from "@/app/actions";
import { notFound } from "next/navigation";

export default async function Image({ params, }: { params: { imageId: string } }) {
  const { imageId } = params;

  const image = await getImage(imageId);
  if (!image) return notFound();

  return (
    image && (
      <div>
        <h1>{image.path}</h1>
        <img src={image.path} />
      </div>
    )
  );
}
