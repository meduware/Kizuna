"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { userData } from "@/lib/types";
import { useGlobalContext } from "@/context/GlobalContext";
import { useTranslation } from "@/hooks/useTranslation";
import { fetchAccountDetails } from "./helpers";

type UserContextType = {
  currentUser: userData | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { currentServer } = useGlobalContext();
  const [currentUser, setCurrentUser] = useState<userData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAccountDetails({ currentServer, setCurrentUser, setLoading });
  }, [currentServer]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UserContext.Provider value={{ currentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  const translation = useTranslation();

  if (!context)
    throw new Error(
      translation("useUserContext must be used within UserContextProvider"),
    );
  return context;
};
