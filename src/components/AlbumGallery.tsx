import ImageCard from "./ImageCard";

export default function AlbumGallery({
  images,
  albumId,
}: {
  images: any;
  albumId: string;
}) {
  return (
    <section className="flex gap-4 flex-wrap">
      {images &&
        images.map((thumb: any) => (
          <ImageCard key={thumb.imageId} image={thumb} albumId={albumId} />
        ))}
    </section>
  );
}
