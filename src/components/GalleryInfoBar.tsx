
"use client"
import { TalbumInfo } from "@/app/dashboard/[clientId]/[albumId]/layout";
import { TAlbum } from "@/core/types";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function GalleryInfoBar({album}: { album: TalbumInfo }) {
  

  return (
    <>
      <div
        className="flex flex-wrap   justify-start gap-2 
    items-center bg-slate-200 p-2 mt-4 rounded-lg"
      >
        <div className="flex items-center">
          <p className="text-slate-700 text-xs font-bold mr-1">Total:</p>
          <p className="text-slate-700 text-xs">
            {album.totalFiles}
            {album.totalFiles == 1 ? " image" : " images"}
          </p>
        </div>

        <div className="flex items-center">
          <p className="text-slate-700 text-xs font-bold mr-1">Limit:</p>
          <p className="text-slate-700 text-xs">{album.selectedLimit} </p>
        </div>
        <div className="flex items-center">
          <p className="text-slate-700 text-xs font-bold mr-1">Selected:</p>
          <p className="text-slate-700 text-xs">
            {album.noOfSelected}
            {album.noOfSelected == 1 ? " image" : " images"}{" "}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-slate-700 text-xs font-bold mr-1">Password:</p>
          <p className="text-slate-700 text-xs">{album.password} </p>
        </div>
        <div className="flex items-center">
          <Link
            href={album.albumUrl}
            target="_blank"
            className="text-slate-700 underline text-xs font-bold mr-1 hover:cursor-pointer hover:text-slate-400"
          >
            Client link
          </Link>
        </div>

        <div className="flex items-center   ml-auto">
          <p className="text-slate-200 text-xs self-end px-4 mr-2 rounded-md  bg-slate-500 p-1 font-bold">
            {album.proofing ? "Proofing" : "Delivered"}
          </p>
          {album.confirmed ? (
            <p className="text-slate-200 text-xs self-end px-4 rounded-md  bg-green-600 p-1 font-bold">
              {" "}
              Confirmed{" "}
            </p>
          ) : (
            <p className="text-slate-200 text-xs self-end px-4 rounded-md  bg-slate-500 p-1 font-bold">
              {" "}
              Not Confirmed{" "}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center  mt-2 mb-6">
       <div className="flex justify-start">
          <p className="text-slate-700 text-xs font-bold mr-1">Album size:</p>
          <p className="text-slate-700 text-xs"> {album.albumSize}</p>
        </div>

        <div className="flex justify-start ml-auto">
          <p className="text-slate-700 text-xs font-bold mr-1">Created At:</p>
          <p className="text-slate-700 text-xs"> {album.createdAt}</p>
        </div>
        
      </div>
    </>
  );


  } 