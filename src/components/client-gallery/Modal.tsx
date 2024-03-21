"use client";

import { useEffect, useState } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  // Handles Escape key to close modal
  const handleKeyDown = (e: any) => {
    if (e.key === "Escape") {
      setOpen(false);
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
        onClick={() => setOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95  z-20"
      >
        <img
          src="/back-arrow.svg"
          alt=""
          className="p-6 rounded-full  absolute left-0 top-0 hover:cursor-pointer hover:opacity-60 hover:-translate-x-1  transition-all duration-240 z-[99999]"
        />
        <div className="p-24 h-full">{children}</div>
      </div>
    )
  );
}
