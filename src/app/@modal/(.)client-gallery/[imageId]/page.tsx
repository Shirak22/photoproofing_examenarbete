"use client";

import Modal from "@/components/client-gallery/Modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const images = [
  {
    id: 1,
    href: "https://images.unsplash.com/photo-1705505460524-8ceac5adcd70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjB8NDI4MzU5N3x8ZW58MHx8fHx8",
  },
  {
    id: 2,
    href: "https://images.unsplash.com/photo-1705505460384-45eabef761e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjJ8NDI4MzU5N3x8ZW58MHx8fHx8",
  },
  {
    id: 3,
    href: "https://images.unsplash.com/photo-1705505459962-5fcafbe2d48b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjV8NDI4MzU5N3x8ZW58MHx8fHx8",
  },
  {
    id: 4,
    href: "https://images.unsplash.com/photo-1705088013553-46199f8b4ecc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzF8NDI4MzU5N3x8ZW58MHx8fHx8",
  },
  {
    id: 5,
    href: "https://images.unsplash.com/photo-1705505460377-cd385df5f422?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzB8NDI4MzU5N3x8ZW58MHx8fHx8",
  },
  {
    id: 6,
    href: "https://images.unsplash.com/photo-1705088014686-9c07c8486e96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzV8NDI4MzU5N3x8ZW58MHx8fHx8",
  },
  {
    id: 7,
    href: "https://images.unsplash.com/photo-1705088014803-0705b681cad3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mzl8NDI4MzU5N3x8ZW58MHx8fHx8",
  },
  {
    id: 8,
    href: "https://images.unsplash.com/photo-1705088014673-df923ab37669?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDN8NDI4MzU5N3x8ZW58MHx8fHx8",
  },
  {
    id: 9,
    href: "https://images.unsplash.com/photo-1705088014790-2ee51194bd0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDJ8NDI4MzU5N3x8ZW58MHx8fHx8",
  },
  {
    id: 10,
    href: "https://images.unsplash.com/photo-1702592162134-7ddfebe12730?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8ODd8NDI4MzU5N3x8ZW58MHx8fHx8",
  },
  {
    id: 11,
    href: "https://images.unsplash.com/photo-1666041839521-0fb8ce16b1fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTIyfDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 12,
    href: "https://images.unsplash.com/photo-1666041835026-0ca04cc79618?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTIxfDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 13,
    href: "https://images.unsplash.com/photo-1666041839547-9c1729d257a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTI1fDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 14,
    href: "https://images.unsplash.com/photo-1666041838340-49a9e47b6ff8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTI2fDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 15,
    href: "https://images.unsplash.com/photo-1659735726409-f019111e4820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTQxfDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 16,
    href: "https://images.unsplash.com/photo-1646335922865-99c084ba5aab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTQ2fDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 17,
    href: "https://images.unsplash.com/photo-1646335922895-ff039f35f140?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTY1fDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 18,
    href: "https://images.unsplash.com/photo-1633460730690-d47e8972dbd4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTg3fDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 19,
    href: "https://images.unsplash.com/photo-1625151515896-c62ec39b11e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTk3fDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 20,
    href: "https://images.unsplash.com/photo-1613256253906-3e5e19769403?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjQ3fDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 21,
    href: "https://images.unsplash.com/photo-1607660051921-c82f01de316c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjUzfDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 22,
    href: "https://images.unsplash.com/photo-1603381517710-6dde0766e1a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjYxfDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 23,
    href: "https://images.unsplash.com/photo-1597427681221-d4beae4f802d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjY4fDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 24,
    href: "https://images.unsplash.com/photo-1597427681188-3ef80f2631ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjcwfDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 25,
    href: "https://images.unsplash.com/photo-1597427681159-1bcf700dbf28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjY5fDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 26,
    href: "https://images.unsplash.com/photo-1597427681248-6e02d2833abb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjcxfDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 27,
    href: "https://images.unsplash.com/photo-1597322894067-2c7f8ba1d426?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjc2fDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 28,
    href: "https://images.unsplash.com/photo-1597175742183-c8def759077b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjc5fDQyODM1OTd8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function ClientImageIntercept({
  params,
}: {
  params: { imageId: string };
}) {
  // TODO - Bug - The image url does not change when modal closes.
  // Closing an image and opening it again does not open the modal as the
  // url path is the same.

  // TODO - The images order go down in column. They should go in a row.
  const [selected, setSelected] = useState(true);
  const image = images.find((image) => image.id === parseInt(params.imageId));
  const router = useRouter();

  const handlePrevClick = () => {
    if (parseInt(params.imageId) > 1) {
      router.push(
        `/client-gallery/${(parseInt(params.imageId) - 1).toString()}`
      );
    } else if (parseInt(params.imageId) === 1) {
      // When hitting the prev button on the first image, it goes to the last image
      router.push(`/client-gallery/${images.length}`);
    }
  };

  const handleNextClick = () => {
    if (parseInt(params.imageId) < images.length) {
      router.push(
        `/client-gallery/${(parseInt(params.imageId) + 1).toString()}`
      );
    } else if (parseInt(params.imageId) === images.length) {
      // When hitting the next button on the last image, it goes back to the first image
      router.push(`/client-gallery/1`);
    }
  };

  // Keyboard left and right arrow keys can be used to navigate through the images
  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowLeft") {
      handlePrevClick();
    } else if (e.key === "ArrowRight") {
      handleNextClick();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Modal>
      <section className="flex justify-end w-full p-8 h-28 bg-neutral-50 z-10 top-0 left-0 absolute">
        <article className="flex gap-4 align-middle h-full">
          <p className="m-auto">0/25</p>
          <button className=" bg-neutral-800 px-6 h-full py-3 ml-8 text-white text-sm font-semibold uppercase rounded-full hover:cursor-pointer hover:bg-neutral-700 transition-all duration-240">
            Confirm selection
          </button>
        </article>
      </section>
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-full p-8 relative rounded-lg "
      >
        <div className="relative w-fit mx-auto h-full rounded-lg ">
          <div
            onClick={() => setSelected(!selected)}
            className=" w-16 h-16 absolute rounded-b-lg top-0 right-6 bg-white shadow-xl flex hover:cursor-pointer"
          >
            <img
              src={`${selected ? "/heart-filled.svg" : "/heart.svg"}`}
              alt=""
              className="w-10 h-10 m-auto "
            />
          </div>
          <img
            src={image?.href}
            alt=""
            className="w-full h-full mx-auto rounded-md object-contain"
          />
          <p className="text-center mt-6 text-neutral-600 text-lg">
            Image name
          </p>
        </div>
      </div>
      <nav className="flex justify-between w-full px-8  z-10 top-1/2 left-0 absolute">
        <button
          onClick={handlePrevClick}
          className="px-3 py-3 rounded-full hover:cursor-pointer hover:scale-110 transition-all duration-240"
        >
          <img src="/nav-arrow.svg" alt="" className=" rotate-180" />
        </button>
        <button
          onClick={handleNextClick}
          className="px-3 py-3 rounded-full hover:cursor-pointer hover:scale-110 transition-all duration-240"
        >
          <img src="/nav-arrow.svg" alt="" />
        </button>
      </nav>
    </Modal>
  );
}
