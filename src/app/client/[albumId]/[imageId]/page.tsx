import { getImage } from "@/app/actions";

export default async function Image({
  params,
}: {
  params: { imageId: string };
}) {
  const { imageId } = params;
  const image = await getImage(imageId);

  console.log(image);

  return (
    image && (
      <div>
        <h1>{image.path}</h1>
        <img src={image.path} />
      </div>
    )
  );
}
