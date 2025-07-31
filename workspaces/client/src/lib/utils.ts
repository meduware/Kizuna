import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { apiHandler } from "./handlers/api";
import { localServer, Server } from "./types";
import { getCookie, setCookie } from "cookies-next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJwt(token: string) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export function getCurrentChannel(currentServer: Server) {
  if (!currentServer) return null;
  const cookie = getCookie("channelStates");
  if (!cookie) return null;
  try {
    const channelStates = JSON.parse(cookie);
    if (!Array.isArray(channelStates)) return null;
    const currentChannel = channelStates.find(
      (channel: { ipAddress: string; port: number; channel_id: string }) =>
        channel.ipAddress === currentServer.technical_details.ipAddress &&
        channel.port === currentServer.technical_details.port,
    );
    return currentChannel ? parseJwt(currentChannel.channel_id) : null;
  } catch (error) {
    console.error("Error parsing channelStates cookie:", error);
    return null;
  }
}

// Mevcut sunucuya bağlı hesabı döndürür
export function getCurrentAccountToken(currentServer: Server | null) {
  if (!currentServer) return null;
  const cookie = getCookie("accountTokens");
  if (!cookie) return null;
  try {
    const accountTokens = JSON.parse(cookie);
    if (!Array.isArray(accountTokens)) return null;
    const currentAccount = accountTokens.find(
      (account: { ipAddress: string; port: number; token: string }) =>
        account.ipAddress === currentServer.technical_details.ipAddress &&
        account.port === currentServer.technical_details.port,
    );

    return currentAccount ? parseJwt(currentAccount.token).sub : null;
  } catch (error) {
    console.error("Error parsing accountTokens cookie:", error);
    return null;
  }
}

// Kullanıcıyı değiştirir ve cookie'yi günceller
export function changeUser(token: string, currentServer: Server | null) {
  if (!currentServer) {
    console.error("No current server found.");
    return;
  }

  let accountTokens: { ipAddress: string; port: number; token: string }[] = [];
  const existingCookie = getCookie("accountTokens");

  if (existingCookie) {
    try {
      accountTokens = JSON.parse(existingCookie);
      if (!Array.isArray(accountTokens)) accountTokens = [];
    } catch (error) {
      console.error("Error parsing accountTokens cookie:", error);
    }
  }

  if (token === "") {
    accountTokens = accountTokens.filter(
      (server) =>
        server.ipAddress !== currentServer.technical_details.ipAddress ||
        server.port !== currentServer.technical_details.port,
    );
  } else {
    const existingIndex = accountTokens.findIndex(
      (server) =>
        server.ipAddress === currentServer.technical_details.ipAddress &&
        server.port === currentServer.technical_details.port,
    );
    if (existingIndex !== -1) {
      accountTokens[existingIndex].token = token;
    } else {
      accountTokens.push({
        ipAddress: currentServer.technical_details.ipAddress,
        port: currentServer.technical_details.port,
        token: token,
      });
    }
  }

  setCookie("accountTokens", JSON.stringify(accountTokens));
}

export function changeChannel(
  channel_id: number,
  ipAddress: string,
  port: number,
  setCurrentChannel: React.Dispatch<any>,
) {
  const cookie = getCookie("channelStates");

  // If the cookie doesn't exist, initialize it with an empty array or with the new channel data
  if (!cookie) {
    const initialChannelState = [
      {
        ipAddress,
        port,
        channel_id,
      },
    ];
    setCookie("channelStates", JSON.stringify(initialChannelState));
    setCurrentChannel(channel_id); // Update the current channel state
    return;
  }

  try {
    let channelStates = JSON.parse(cookie);

    // Ensure that channelStates is an array
    if (!Array.isArray(channelStates)) {
      console.error("Invalid cookie format for channelStates");
      channelStates = [];
    }

    const existingChannelIndex = channelStates.findIndex(
      (channel: { ipAddress: string; port: number; channel_id: string }) =>
        channel.ipAddress === ipAddress && channel.port === port,
    );

    if (existingChannelIndex !== -1) {
      // Update the existing channel with the new channel_id
      channelStates[existingChannelIndex] = {
        ...channelStates[existingChannelIndex],
        channel_id,
      };
    } else {
      // Add the new channel to the list
      channelStates.push({
        ipAddress,
        port,
        channel_id,
      });
    }

    // Update the cookie with the new channel states
    setCookie("channelStates", JSON.stringify(channelStates));

    // Update the current channel state with the new channel_id
    setCurrentChannel(channel_id);
  } catch (error) {
    console.error("Error changing channel:", error);
  }
}

export async function changeServer(
  server: localServer,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  currentServer: Server | null,
  setCurrentServer: React.Dispatch<Server | null>,
  setCurrentChannel: React.Dispatch<any>,
  setServerList: React.Dispatch<React.SetStateAction<Server[]>>,
) {
  setLoading(true);
  try {
    let serverResponse = await apiHandler(
      `http://${server.ipAddress}:${server.port}/api/server-management/server-details`,
      {},
      "GET",
    );
    if (!serverResponse) {
      throw new Error(`${server.ipAddress}:${server.port} is not available`);
    }
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
    serverResponse.server_details.channels = channelResponse.channels || [];
    serverResponse.server_details.roles = roleResponse || [];

    if (
      currentServer &&
      currentServer.technical_details.ipAddress === server.ipAddress &&
      currentServer.technical_details.port === server.port
    ) {
      console.log("Same server.");
      setLoading(false);
      return;
    }

    let storedServers: { ipAddress: string; port: number }[] = [];
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
    if (
      !storedServers.some(
        (s) =>
          s.ipAddress == newServerInfo.ipAddress &&
          s.port == newServerInfo.port,
      )
    ) {
      storedServers.push(newServerInfo);
    }
    localStorage.setItem("serverList", JSON.stringify(storedServers));
    setServerList((prevState: any) => {
      const exists = prevState.some(
        (s: any) =>
          s.technical_details.ipAddress == server.ipAddress &&
          s.technical_details.port == server.port,
      );
      return exists ? prevState : [...prevState, serverResponse.server_details];
    });
    setCurrentServer(serverResponse.server_details);
    localStorage.setItem("currentServer", JSON.stringify(newServerInfo));

    if (newServerInfo) {
      const channelsCookie = getCookie("channelStates");
      const parsedChannelsCookie = channelsCookie
        ? JSON.parse(channelsCookie)
        : [];

      setCurrentChannel(
        parsedChannelsCookie.find(
          (channel: { ipAddress: string; port: number; channel_id: string }) =>
            channel.ipAddress === newServerInfo.ipAddress &&
            channel.port === newServerInfo.port,
        )?.channel_id,
      );
    }
  } catch (error) {
    console.error("Error changing server:", error);
  } finally {
    setLoading(false);
  }
}

export async function reloadServerList(
  setServerList: React.Dispatch<React.SetStateAction<Server[]>>,
  setCurrentServer: React.Dispatch<Server | null>,
  setCurrentChannel: React.Dispatch<any>,
) {
  const storedServerList = localStorage.getItem("serverList");
  const storedCurrentServer = localStorage.getItem("currentServer");
  let parsedLocalServerList: localServer[] = [];
  let parsedCurrentLocalServer: localServer | null = null;

  if (storedServerList) {
    try {
      parsedLocalServerList = JSON.parse(storedServerList);
      if (!Array.isArray(parsedLocalServerList)) parsedLocalServerList = [];
    } catch (error) {
      console.error("Error parsing serverList:", error);
    }
  }

  if (storedCurrentServer) {
    try {
      parsedCurrentLocalServer = JSON.parse(storedCurrentServer);
    } catch (error) {
      console.error("Error parsing currentServer:", error);
    }
  }

  if (parsedLocalServerList.length > 0) {
    const fetchedServers: Server[] = [];

    await Promise.all(
      parsedLocalServerList.map(async (server) => {
        try {
          let serverResponse = await apiHandler(
            `http://${server.ipAddress}:${server.port}/api/server-management/server-details`,
            {},
            "GET",
          );

          if (!serverResponse) {
            throw new Error(
              `${server.ipAddress}:${server.port} is not available`,
            );
          }

          if (
            parsedCurrentLocalServer &&
            parsedCurrentLocalServer.ipAddress == server.ipAddress &&
            parsedCurrentLocalServer.port == server.port
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

            const channelsCookie = getCookie("channelStates");
            const parsedChannelsCookie = channelsCookie
              ? JSON.parse(channelsCookie)
              : [];

            setCurrentChannel(
              parsedChannelsCookie.find(
                (channel: {
                  ipAddress: string;
                  port: number;
                  channel_id: string;
                }) =>
                  channel.ipAddress ===
                    serverResponse.server_details.technical_details.ipAddress &&
                  channel.port ===
                    serverResponse.server_details.technical_details.port,
              )?.channel_id,
            );
          }
          fetchedServers.push(serverResponse.server_details);
        } catch (error) {
          console.log("Error fetching server details:", error);
        }
      }),
    );
    setServerList(fetchedServers);
  }
}

export function sortServersByPort(serverList: Server[]) {
  return serverList.sort((a: Server, b: Server) => {
    return a.technical_details.port - b.technical_details.port;
  });
}
