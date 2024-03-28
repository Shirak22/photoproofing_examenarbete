import {
  getAlbum,
  getClient,
  getPhotographer,
} from "@/app/actions/get-actions";

import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

export type TalbumInfo = {
  proofing: boolean;
  password: string;
  noOfSelected: number;
  selectedLimit: number;
  totalFiles?: number;
  confirmed: boolean;
  albumUrl: string;
  createdAt: string;
  albumSize?: string;
};

export default async function albumLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { clientId: string; albumId: string };
}) {
  const session = await getServerSession();
  const client = await getClient(params.clientId);
  const photographer = await getPhotographer(session?.user?.email as string);
  const album = await getAlbum(params.albumId);

  if (!client || !photographer || !album) return redirect("/dashboard");
  if (client.photographerId !== photographer.userId) return notFound();

  return (
    <div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
