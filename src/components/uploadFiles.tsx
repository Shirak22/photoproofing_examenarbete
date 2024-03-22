import { uploadImages } from "@/app/actions";
import H1 from "@/core/typography/H1";
import { Suspense } from "react";


  
export default function UploadFiles({albumId }: { albumId: string }) {
  
  const upload = async (formData: FormData) => {
    "use server"
     await uploadImages(formData, albumId);
  }
  
  return (
      <form className="bg-slate-100 py-4 px-2" action={upload}>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/png, image/jpg, image/jpeg "
          multiple
        />
        <button type="submit">Upload</button>
      </form>
  );
}