import { getAlbum, getAlbumThumbnails} from "@/app/actions";
import ImageCardDashboard from "@/components/ImageCardDashboard";
import UploadFiles from "@/components/uploadFiles";
import H1 from "@/core/typography/H1";
import { notFound } from "next/navigation";

export default async function Album({
  params,
}: {
  params: {
    clientId: string;
    albumId: string;
  },
}) {

  const thumbs = await getAlbumThumbnails(params.albumId);
  
  if(!thumbs) return <h1>No files found</h1>;

  return (
    <div>
        {/* //if you want to style you can add styling prop to H1 */}
  
      
      <section className="flex gap-4 flex-wrap">
        {thumbs &&
          thumbs.map((image: any) => (
            <ImageCardDashboard image={image} albumId={params.albumId} />
          ))}
      </section>
    </div>
  );
}
