
import { uploadImages } from "@/app/actions";
import UploadFormWrapper from "./UploadFormWrapper";


export default function UploadFiles({albumId }: { albumId: string }) {

  const upload = async (formData: FormData) => {
    "use server"
     await uploadImages(formData, albumId);
  }
  
  return (
    <form
      className=" rounded-md py-4 px-2 table ml-auto bg-slate-200  "
      action={upload}
    >
      <UploadFormWrapper>
        <input
        className=""
          type="file"
          name="file"
          id="file"
          accept="image/png, image/jpg, image/jpeg "
          multiple
        />

        <button
          className="bg-slate-400 py-1 px-2 ml-2 rounded-md text-white hover:bg-slate-500 transition duration-300 ease-in-out"
          type="submit"
        >
          upload
        </button>
      </UploadFormWrapper>
    </form>
  );
}