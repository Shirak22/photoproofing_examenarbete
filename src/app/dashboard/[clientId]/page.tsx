import { getClient, getPhotographer } from "@/app/actions";
import AlbumTableSSR from "@/components/AlbumTableSSR";
import NewAlbumForm from "@/components/NewAlbumForm";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Client({
  params,
}: {
  params: {
    clientId: string;
  };
}) {
  const session = await getServerSession();
  const client = await getClient(params.clientId);
  const { userId } = await getPhotographer(session?.user?.email as string);

  if (client.photographerId !== userId) {
    return (
      <>
        <h1 className="text-5xl font-bold my-20 mb-40">
          You don't have access to this client
        </h1>
      </>
    );
  }

  return (
    <>
      {client && (
        <h1 className="text-5xl font-bold my-20 mb-40">{client.clientName}</h1>
      )}
      <AlbumTableSSR clientId={params.clientId} />
      <Link href={`/dashboard/${params.clientId}/new-album`}>NEW ALBUM</Link>
    </>
  );
}
