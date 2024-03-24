"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ModalConfirm({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  // Handles Escape key to close modal

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Escape") {
      handleModalClose();
    }
  };

  // Add event listener to close modal when pressing escape key
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    open && (
      <div
        onClick={handleModalClose}
        className="fixed inset-0 flex items-center align-middle justify-center bg-neutral-900 bg-opacity-70  z-20"
      >
        <div className="p-24">{children}</div>
      </div>
    )
  );
}
