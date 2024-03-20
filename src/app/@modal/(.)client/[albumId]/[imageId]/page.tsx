import { getAllImages, getImage } from "@/app/actions";
import LikeButton from "@/components/client-gallery/LikeButton";
import Modal from "@/components/client-gallery/Modal";
import ModalContent from "@/components/client-gallery/ModalContent";
import SelectionBar from "@/components/client-gallery/SelectionBar";
import SlideshowNavButtons from "@/components/client-gallery/SlideshowNavButtons";

export default async function ClientImageIntercept({
  params,
}: {
  params: { imageId: string };
}) {
  // TODO - The images order go down in column. They should go in a row.
  // TODO - Bug - The image url does not change when modal closes.
  // Closing an image and opening it again does not open the modal as the
  // url path is the same.

  const image = await getImage(params.imageId);
  const albumImages = await getAllImages(image?.albumId);

  return (
    <Modal>
      <SelectionBar
        selectedLimit={25}
        images={albumImages}
        className="flex justify-end w-full p-8 h-28 bg-neutral-50 z-10 top-0 left-0 absolute"
      />
      <ModalContent image={image} />
      <SlideshowNavButtons image={image} albumImages={albumImages} />
    </Modal>
  );
}
