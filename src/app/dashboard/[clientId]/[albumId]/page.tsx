import { getAlbumThumbnails} from "@/app/actions";
import DashboardGallery from "@/components/DashboardGallery";
import UploadFiles from "@/components/uploadFiles";
export default async function Album({
  params,
}: {
  params: {
    clientId: string;
    albumId: string;
  },
}) {

  const thumbs = await getAlbumThumbnails(params.albumId);
  
  if(!thumbs){
    return (
      <div>
        <UploadFiles albumId={params.albumId} />
        <h1>No files found</h1>
      </div>
    );
  }else {
    return (
      <div>
        <UploadFiles albumId={params.albumId} />
        <DashboardGallery thumbs={thumbs} albumId={params.albumId} />
      </div>
    );
  }
  

 
}
