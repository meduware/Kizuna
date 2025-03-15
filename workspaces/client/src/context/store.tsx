"use client";
import { apiHandler } from "@/lib/handlers/api";
import { GlobalContextType, initialGlobalContext, Server } from "@/lib/types";
import { parseJwt } from "@/lib/utils";
import Cookies from "js-cookie";
import { createContext, useContext, useState, useEffect } from "react";

export const GlobalContext =
  createContext<GlobalContextType>(initialGlobalContext);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentServer, setCurrentServer] = useState<any>(null);
  const [serverList, setServerList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = parseJwt(Cookies.get("token") || "");

  useEffect(() => {
    reloadServerList();
  }, []);

  async function changeServer(server: any) {
    setLoading(true);
    console.log(server);

    try {
      // Sunucu detaylarını çek
      let serverResponse = await apiHandler(
        `http://${server.ipAddress}:${server.port}/api/server-management/server-details`,
        {},
        "GET",
      );

      // Kanal ve rol verilerini çek
      const channelResponse = await apiHandler(
        `http://${server.ipAddress}:${server.port}/api/channel-management/get-channels`,
        {},
        "GET",
      ).catch(() => ({ channels: [] }));

      const roleResponse = await apiHandler(
        `http://${server.ipAddress}:${server.port}/api/role-management/get-roles-with-users`,
        {},
        "GET",
      ).catch(() => []);

      // Güncellenmiş sunucu detaylarını ekle
      serverResponse.server_details.channels = channelResponse.channels || [];
      serverResponse.server_details.roles = roleResponse || [];

      // Eğer aynı sunucu zaten `currentServer` ise, güncellemeye gerek yok
      if (
        currentServer &&
        currentServer.technical_details.ipAddress === server.ipAddress &&
        currentServer.technical_details.port === server.port
      ) {
        console.log("Same server.");
        setLoading(false);
        return;
      }

      // **LocalStorage'daki server listesini güncelle**
      let storedServers: { ipAddress: string; port: string }[] = [];
      const storedData = localStorage.getItem("serverList");

      if (storedData) {
        try {
          storedServers = JSON.parse(storedData);
          if (!Array.isArray(storedServers)) storedServers = [];
        } catch (error) {
          console.error("Error parsing serverList:", error);
        }
      }

      const newServerInfo = {
        ipAddress: server.ipAddress,
        port: server.port,
      };

      // **Aynı sunucu zaten varsa eklemeyelim**
      if (
        !storedServers.some(
          (s) =>
            s.ipAddress === newServerInfo.ipAddress &&
            s.port === newServerInfo.port,
        )
      ) {
        storedServers.push(newServerInfo);
      }

      // LocalStorage güncelle
      localStorage.setItem("serverList", JSON.stringify(storedServers));

      // **serverList state'inde tekrarları önleyerek güncelle**
      setServerList((prevState) => {
        const exists = prevState.some(
          (s) =>
            s.technical_details.ipAddress == server.ipAddress &&
            s.technical_details.port == server.port,
        );

        return exists
          ? prevState
          : [...prevState, serverResponse.server_details];
      });

      // Seçili sunucuyu güncelle
      setCurrentServer(serverResponse.server_details);
      localStorage.setItem("currentServer", JSON.stringify(newServerInfo));

      console.log(serverResponse);
      console.log(storedServers);
      console.log(serverList);
    } catch (error) {
      console.error("Error changing server:", error);
    } finally {
      setLoading(false);
    }
  }

  async function reloadServerList() {
    const storedServerList = localStorage.getItem("serverList");
    const storedCurrentServer = localStorage.getItem("currentServer");

    let parsedServerList: Server[] = [];
    let parsedCurrentServer: Server | null = null;

    if (storedServerList) {
      try {
        parsedServerList = JSON.parse(storedServerList);
        if (!Array.isArray(parsedServerList)) {
          parsedServerList = [];
        }
      } catch (error) {
        console.error("Error parsing serverList:", error);
      }
    }

    if (storedCurrentServer) {
      try {
        parsedCurrentServer = JSON.parse(storedCurrentServer);
      } catch (error) {
        console.error("Error parsing currentServer:", error);
      }
    }

    if (parsedServerList.length > 0) {
      const fetchedServers: Server[] = [];

      await Promise.all(
        parsedServerList.map(async (server) => {
          try {
            let serverResponse = await apiHandler(
              `http://${server.ipAddress}:${server.port}/api/server-management/server-details`,
              {},
              "GET",
            );

            if (!serverResponse) {
              throw new Error("Server is not available");
            }

            // Güncellenmiş detayları ekleyelim
            if (
              parsedCurrentServer &&
              parsedCurrentServer.ipAddress === server.ipAddress &&
              parsedCurrentServer.port === server.port
            ) {
              const channelResponse = await apiHandler(
                `http://${server.ipAddress}:${server.port}/api/channel-management/get-channels`,
                {},
                "GET",
              );

              const roleResponse = await apiHandler(
                `http://${server.ipAddress}:${server.port}/api/role-management/get-roles-with-users`,
                {},
                "GET",
              );

              serverResponse.server_details.channels = channelResponse.channels;
              serverResponse.server_details.roles = roleResponse;

              setCurrentServer(serverResponse.server_details);
            }

            fetchedServers.push(serverResponse.server_details);
          } catch (error) {
            console.error("Error fetching server details:", error);
          }
        }),
      );

      // **Tekrarlı sunucuların eklenmesini önleyerek güncelle**
      setServerList((prevState) => {
        const mergedServers = [...prevState, ...fetchedServers];

        return mergedServers.filter(
          (server, index, self) =>
            index ===
            self.findIndex(
              (s) =>
                s.technical_details.ipAddress ===
                server.technical_details.ipAddress &&
                s.technical_details.port === server.technical_details.port,
            ),
        );
      });
    }

    setLoading(false);
  }

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        currentServer,
        changeServer,
        serverList,
        reloadServerList,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
