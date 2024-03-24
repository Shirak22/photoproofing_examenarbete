import ModalForm from "@/components/ModalForm";
import NewAlbumForm from "@/components/NewAlbumForm";
import NewClientForm from "@/components/NewClientForm";

export default function NewAlbumPageIntercept({
  params,
}: {
  params: {
    clientId: string;
  };
}) {
  console.log(params.clientId);

  return (
    <ModalForm>
      <NewAlbumForm clientId={params.clientId} />
    </ModalForm>
  );
}
