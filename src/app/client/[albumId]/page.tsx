import {
  getAlbum,
  getAlbumThumbnails,
  getClient,
  getPhotographer,
  getPhotographerById,
} from "@/app/actions";
import Footer from "@/components/client-gallery/Footer";
import GallerySection from "@/components/client-gallery/GallerySection";
import Hero from "@/components/client-gallery/Hero";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function ClientGallery({
  params,
}: {
  params: { albumId: string };
}) {
  const album = await getAlbum(params.albumId);
  const client = await getClient(album.clientId);
  const photographer = await getPhotographerById(client.photographerId);

  if (!album) return notFound();

  const session = await getServerSession();
  if (!session || session?.user?.name !== params.albumId)
    return redirect(`/client/login?albumId=${params.albumId}`);

  return (
    <div>
      <Hero title={album.title} description={album.description} />
      <GallerySection album={album} />
      <Footer photographer={photographer} />
    </div>
  );
}
