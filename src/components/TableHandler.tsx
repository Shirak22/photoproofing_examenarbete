"use client";

import { useState } from "react";
import NewAlbumSlideOver from "./NewAlbumSlideOver";
import AlbumTable from "./AlbumTable";
import ClientTable from "./ClientTable";
import NewClientSlideOver from "./NewClientSlideOver";
import { TClient } from "@/core/types";

export default function TableHandler({ type }: { type: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (type === "client") {
    return (
      <>
        <ClientTable setIsOpen={setIsOpen} />
        <NewClientSlideOver isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    );
  } else if (type === "album") {
    return (
      <>
        <AlbumTable setIsOpen={setIsOpen} />
        <NewAlbumSlideOver isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    );
  }
}
