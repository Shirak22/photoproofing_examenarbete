"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModalForm({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  // Handles Escape key to close modal

  const handleModalClose = () => {
    setOpen(false);
    router.back();
    // Goes back to gallery page since the modal navigation is not added to the history stack
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
        className="fixed inset-0 flex justify-end bg-white bg-opacity-70 z-20 "
      >
        <div
          className="bg-white shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    )
  );
}
