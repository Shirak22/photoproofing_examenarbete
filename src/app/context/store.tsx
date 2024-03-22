"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { TImage, TThumbnail } from "@/core/types";

interface TContextProps {
  noOfSelectedImages: number;
  setNoOfSelectedImages: Dispatch<SetStateAction<number>>;
  selectedImages: any[];
  setSelectedImages: Dispatch<SetStateAction<TImage[]>>;
}

const GlobalContext = createContext<TContextProps>({
  noOfSelectedImages: 0,
  setNoOfSelectedImages: (num): void => {
    num;
  },
  selectedImages: [{}], // Default value
  setSelectedImages: (images): void => {
    images;
  },
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [noOfSelectedImages, setNoOfSelectedImages] = useState<number>(0);
  const [selectedImages, setSelectedImages] = useState<TImage[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        noOfSelectedImages,
        setNoOfSelectedImages,
        selectedImages,
        setSelectedImages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
