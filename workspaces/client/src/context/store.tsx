"use client";
import {
  GlobalContextType,
  initialGlobalContext,
  localServer,
  Server,
} from "@/lib/types";
import {
  changeServer,
  changeUser,
  getCurrentAccount,
  reloadServerList,
  sortServersByPort,
} from "@/lib/utils";
import { createContext, useContext, useState, useEffect } from "react";

export const GlobalContext =
  createContext<GlobalContextType>(initialGlobalContext);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentServer, setCurrentServer] = useState<Server | null>(null);
  const [serverList, setServerList] = useState<Server[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    handleReloadServerList();
  }, []);

  sortServersByPort(serverList);

  const currentAccount = currentServer
    ? getCurrentAccount(currentServer)
    : null;

  function handleChangeUser(token: string) {
    changeUser(token, currentServer);
    handleReloadServerList();
  }

  async function handleChangeServer(server: localServer) {
    await changeServer(
      server,
      setLoading,
      currentServer,
      setCurrentServer,
      setServerList,
    );
    handleReloadServerList();
  }

  async function handleReloadServerList() {
    await reloadServerList(setLoading, setServerList, setCurrentServer);
  }

  return (
    <GlobalContext.Provider
      value={{
        currentUser: currentAccount,
        currentServer,
        changeServer: handleChangeServer,
        changeUser: handleChangeUser,
        serverList,
        reloadServerList: handleReloadServerList,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
