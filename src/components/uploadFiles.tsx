
import { uploadImages } from "@/app/actions";
import UploadFormWrapper from "./UploadFormWrapper";


export default function UploadFiles({albumId }: { albumId: string }) {

  const upload = async (formData: FormData) => {
    "use server"
     await uploadImages(formData, albumId);
  }
  
  return (
      <form className="flex justify-end rounded-md py-1 px-2 mb-10 w-auto bg-slate-200 " action={upload}>
        <UploadFormWrapper>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/png, image/jpg, image/jpeg "
          multiple
        />
       <button className="bg-slate-400 py-1 px-2  rounded-md text-white" type="submit">upload</button>
       </UploadFormWrapper>
      </form>
  );
}