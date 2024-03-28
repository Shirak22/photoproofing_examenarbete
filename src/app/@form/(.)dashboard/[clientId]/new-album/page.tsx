import ModalForm from "@/components/client-components/ModalForm";
import NewAlbumForm from "@/components/Dashboard-components/forms/NewAlbumForm";

export default function NewAlbumPageIntercept({
  params,
}: {
  params: {
    clientId: string;
  };
}) {

  return (
    <ModalForm>
      <NewAlbumForm clientId={params.clientId} />
    </ModalForm>
  );
}
