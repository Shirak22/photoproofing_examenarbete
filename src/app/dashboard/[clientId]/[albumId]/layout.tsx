import { getAlbum, getClient, getPhotographer } from "@/app/actions";

import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import UploadFiles from "@/components/uploadFiles";
import H1 from "@/core/typography/H1";

export default async function albumLayout(
    {children,
     params,

    }: 
    {children: React.ReactNode,
     params: {clientId: string, albumId: string},
    }){

    const session = await getServerSession();
    const client = await getClient(params.clientId);
    const photographer = await getPhotographer(session?.user?.email as string);
    const album = await getAlbum(params.albumId);

    if(!client || !photographer || !album) return redirect("/dashboard");
    if(client.photographerId !== photographer.userId) return notFound();


    return (
      <div>
        <Suspense fallback={<Loading />}>
          <H1 styling="text-slate-700">{album?.title}</H1>
          <UploadFiles albumId={params.albumId} />
          {children}
        </Suspense>
      </div>
    );
}