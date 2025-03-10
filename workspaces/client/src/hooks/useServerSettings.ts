"use client";

import { useState } from "react";
import { Server } from "@shared/types";

export const useServerSettings = (initialServer: Server) => {
  // till db integration manually data entry
  const [serverInfo, setServerInfo] = useState<Server>(initialServer);

  const updateServerName = (name: string) => {
    setServerInfo((prev) => ({
      ...prev,
      serverName: name,
    }));
  };

  const updateServerPhoto = () => {
    console.log("Supabase Server Integration needed");
  };

  const updateWelcomeChannel = (channelId: string) => {
    setServerInfo((prev) => ({
      ...prev,
      welcomeChannel: channelId,
    }));
  };

  const updateLogEnabled = (enabled: boolean) => {
    setServerInfo((prev) => ({
      ...prev,
      logEnabled: enabled,
    }));
  };

  const updateLogChannel = (channelId: string) => {
    setServerInfo((prev) => ({
      ...prev,
      logChannel: channelId,
    }));
  };

  const saveSettings = () => {
    console.log("Saving server settings:", serverInfo);
  };

  return {
    serverInfo,
    updateServerName,
    updateServerPhoto,
    updateWelcomeChannel,
    updateLogEnabled,
    updateLogChannel,
    saveSettings,
  };
};
