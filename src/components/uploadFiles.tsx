import { uploadImages } from "@/app/actions";


  
export default function UploadFiles({albumId }: { albumId: string }) {
  const upload = async (formData: FormData) => {
    "use server"
    
     await uploadImages(formData, albumId);
  }
  
  return (
    <form action={upload}>
      <input type="file" name="file" id="file" accept="image/png, image/jpg, image/jpeg " multiple />
      <button type="submit">Upload</button>
    </form>
  );
}