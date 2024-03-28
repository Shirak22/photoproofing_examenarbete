import NewAlbumForm from "@/components/Dashboard-components/forms/NewAlbumForm";

export default function NewAlbumPage({
  params,
}: {
  params: { clientId: string };
}) {
  return (
    <div className=" flex justify-center ">
      <NewAlbumForm clientId={params.clientId} />;
    </div>
  );
}
