"use client";
import {
  GlobalContextType,
  initialGlobalContext,
  localServer,
  Server,
  userData,
} from "@/lib/types";
import {
  changeChannel,
  changeServer,
  changeUser,
  getCurrentAccountToken,
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
  const [currentUser, setCurrentUser] = useState<userData | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [serverList, setServerList] = useState<Server[]>([]);
  const [currentChannel, setCurrentChannel] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createSupabaseClient();

  useEffect(() => {
    handleReloadServerList();
  }, []);

  sortServersByPort(serverList);

  async function handleGetAccountDetails(): Promise<userData | null> {
    setLoading(true);
    try {
      if (!currentServer) return null;

      const accountId = getCurrentAccountToken(currentServer);
      if (!accountId) return null;

      const { data, error } = await supabase
        .from("user_roles")
        .select(
          `
        id,
        user:users(id, username, email, photo_url),
        role:roles(
          role_name,
          role_color,
          permissions
        )
      `,
        )
        .eq("user_id", accountId)
        .single<userData>();

      if (error) {
        console.error("Error fetching account details:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error fetching account details:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchAccountDetails() {
      const userDetail: userData | null = await handleGetAccountDetails();
      setCurrentUser(userDetail);
    }

    if (currentServer) {
      fetchAccountDetails();
    }
  }, [currentServer]); // eslint-disable-line react-hooks/exhaustive-deps

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
    await reloadServerList(setServerList, setCurrentServer, setCurrentChannel);
    setLoading(false);
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
        currentUser,
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
        setCurrentServer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
