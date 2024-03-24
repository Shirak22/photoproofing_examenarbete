import { calcAlbumDiskUsage, getAlbum, getAllImages, getClient, getPhotographer } from "@/app/actions";

import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import GalleryInfoBar from "@/components/GalleryInfoBar";



  export type TalbumInfo = {
    proofing: boolean,
    password: string,
    noOfSelected: number,
    selectedLimit: number,
    totalFiles?: number,
    confirmed: boolean,
    albumUrl: string,
    createdAt: string,
    albumSize?: string,
  }

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
    const allFilesInAlbum = await getAllImages(params.albumId);
    const getAlbumSize = await calcAlbumDiskUsage(params.albumId);

    const albumInfo : TalbumInfo = {
      proofing: album?.proofing,
      password: album?.password,
      noOfSelected: album?.noOfSelected,
      selectedLimit: album?.selectedLimit,
      totalFiles: allFilesInAlbum?.length,
      confirmed: album?.confirmed,
      albumUrl: album?.albumUrl,
      createdAt: album?.createdDate.toDateString(),
      albumSize: getAlbumSize,
    }
      

    if(!client || !photographer || !album) return redirect("/dashboard");
    if(client.photographerId !== photographer.userId) return notFound();
    

    return (
      <div>
        
        <section className="flex">
          <article>
            <h1 className="text-5xl text-slate-700 mb-1 ">{album?.title}</h1>
            <p className="text-slate-500 text-sm ml-5">{album?.description}</p>
          </article>

           {/* <UploadFiles albumId={params.albumId} /> */}

        </section>
        
        {/* <button className="bg-slate-500 text-xs p-1 text-white rounded-md">| Upload</button> */}

        <GalleryInfoBar album={albumInfo} />

        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    );
}