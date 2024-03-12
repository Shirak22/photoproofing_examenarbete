
import { uploadFiles } from "@/app/actions";


  
export default function UploadFiles({albumId }: { albumId: string }) {
  const upload = async (formData: FormData) => {
    "use server"
     await uploadFiles(formData, albumId);
  }
  
  return (
    <form action={upload}>
      <input type="file" name="file" id="file" multiple />
      <button type="submit">Upload</button>
    </form>
  );
}