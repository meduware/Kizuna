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
  reloadServerList,
  sortServersByPort,
} from "@/lib/utils";
import { createSupabaseClient } from "@shared/supabase/createClient";
import { createContext, useContext, useState, useEffect } from "react";

export const GlobalContext =
  createContext<GlobalContextType>(initialGlobalContext);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentServer, setCurrentServer] = useState<Server | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
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

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
        id,
        message,
        files,
        created_at,
        userData:user_roles(
          id,
          user:users(id, username, photo_url),
          role:roles(
            role_name,
            role_color,
            permissions
          )
        )
      `,
      )
      .eq("channel_id", currentChannel)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    setMessages(data || []);
  };

  const supabase = createSupabaseClient();

  supabase
    .channel("roles")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "roles" },
      (payload: any) => {
        if (!currentServer) return;

        const updatedRoles = currentServer.roles.map((role) => {
          if (role.id === payload.new.id) {
            return {
              ...role,
              index: payload.new.index,
              role_name: payload.new.role_name,
              role_color: payload.new.role_color,
              permissions: payload.new.permissions,
            };
          }
          return role;
        });
        setCurrentServer({ ...currentServer, roles: updatedRoles });
        fetchMessages();
      },
    )
    .subscribe();

  supabase
    .channel("channels")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "channels" },
      (payload: any) => {
        if (!currentServer) return;
        const updatedChannels = currentServer.channels.map((channel) => {
          if (channel.id === payload.new.id) {
            return {
              ...channel,
              index: payload.new.index,
              channel_name: payload.new.channel_name,
              channel_description: payload.new.channel_description,
              channel_permissions: payload.new.channel_permissions,
            };
          }
          return channel;
        });
        setCurrentServer({ ...currentServer, channels: updatedChannels });
      },
    )
    .subscribe();

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
        messages,
        setMessages,
        fetchMessages,
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
