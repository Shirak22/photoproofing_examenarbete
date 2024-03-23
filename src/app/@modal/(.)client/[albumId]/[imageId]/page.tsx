import { getAlbum, getAllImages, getImage } from "@/app/actions";
import Modal from "@/components/client-gallery/Modal";
import ModalImage from "@/components/client-gallery/ModalImage";
import SelectionBar from "@/components/client-gallery/SelectionBar";
import SlideshowNavButtons from "@/components/client-gallery/SlideshowNavButtons";
import { notFound } from "next/navigation";

export default async function ClientImageIntercept({
  params,
}: {
  params: { imageId: string; albumId: string };
}) {
  // TODO - The images order go down in column. They should go in a row.
  // TODO - Bug - The image url does not change when modal closes.
  // Closing an image and opening it again does not open the modal as the
  // url path is the same.

  const image = await getImage(params.imageId);
  const album = await getAlbum(params.albumId);

  if (!image || !album) {
    return notFound();
  }

  return (
    <Modal>
      <SelectionBar
        modal={true}
        album={album}
        className="flex justify-end w-full p-8 h-28 bg-neutral-50 z-10 top-0 left-0 absolute"
      />
      <ModalImage image={image} selectedLimit={album.selectedLimit} />
      <SlideshowNavButtons image={image} />
    </Modal>
  );
}
