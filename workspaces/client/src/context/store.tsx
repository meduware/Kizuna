"use client";
import {
  GlobalContextType,
  initialGlobalContext,
  localServer,
  Server,
} from "@/lib/types";
import {
  changeChannel,
  changeServer,
  changeUser,
  getCurrentAccount,
  parseJwt,
  reloadServerList,
  sortServersByPort,
} from "@/lib/utils";
import { getCookie } from "cookies-next";
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
  const [currentChannel, setCurrentChannel] = useState<any>(null); // Add state for currentChannel
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
      setCurrentChannel,
      setServerList,
    );
    handleReloadServerList();
  }

  async function handleReloadServerList() {
    await reloadServerList(
      setLoading,
      setServerList,
      setCurrentServer,
      setCurrentChannel,
    );
  }

  // Add function to change the currentChannel
  async function handleChangeChannel(
    channel_id: number,
    ipAddress: string,
    port: number,
  ) {
    if (!currentServer) return;

    changeChannel(channel_id, ipAddress, port, setCurrentChannel);
  }

  return (
    <GlobalContext.Provider
      value={{
        currentUser: currentAccount,
        currentServer,
        currentChannel,
        changeServer: handleChangeServer,
        changeUser: handleChangeUser,
        reloadServerList: handleReloadServerList,
        serverList,
        loading,
        changeChannel: handleChangeChannel,
        setCurrentChannel,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
