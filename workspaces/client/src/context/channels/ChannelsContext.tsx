"use client";
import { createContext, useContext } from "react";
import { useTranslation } from "@/hooks/useTranslation";

type ChannelsContextType = {};

const ChannelsContext = createContext<ChannelsContextType | undefined>(
  undefined,
);

export const ChannelsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ChannelsContext.Provider value={{}}>{children}</ChannelsContext.Provider>
  );
};

export const useChannelsContext = () => {
  const context = useContext(ChannelsContext);
  const translation = useTranslation();

  if (!context)
    throw new Error(
      translation("useChannelsContext must be used within ChannelsProvider"),
    );
  return context;
};
