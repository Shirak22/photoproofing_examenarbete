"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { getAlbum } from "../actions";

interface TContextProps {
  noOfSelectedImages: number;
  setNoOfSelectedImages: Dispatch<SetStateAction<number>>;
}

const GlobalContext = createContext<TContextProps>({
  noOfSelectedImages: 0,
  setNoOfSelectedImages: (num): void => {
    num;
  },
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [noOfSelectedImages, setNoOfSelectedImages] = useState<number>(0);

  return (
    <GlobalContext.Provider
      value={{ noOfSelectedImages, setNoOfSelectedImages }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
