"use client";
import { useTranslation } from "@/hooks/useTranslation";

import { useState, useCallback, useEffect } from "react";
import { Server } from "@shared/types";
import { apiHandler } from "@/lib/handlers/api";
import { baseUrls } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";

export const useServerSettings = () => {
  const [serverInfo, setServerInfo] = useState<Server | null>();
  const [localServerInfo, setLocalServerInfo] = useState<Server | null>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const translation = useTranslation();

  const fetchServerInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiHandler(
        `${baseUrls.API}/api/server-management/server-details`,
        null,
        "GET"
      );
      setServerInfo(response.server_details);
      setLocalServerInfo(response.server_details);
    } catch (error) {
      console.error("Error fetching server info:", error);
      toast({
        title: translation("Error"),
        description: translation("Failed to load server information"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchServerInfo();
  }, [fetchServerInfo]);

  const updateServerName = useCallback((name: string) => {
    setLocalServerInfo((prev) => (prev ? { ...prev, server_name: name } : undefined));
  }, []);

  const updateServerPhoto = useCallback(
    async (file: File) => {
      if (!file) return null;

      try {
        setSelectedFile(file);
        const previewUrl = URL.createObjectURL(file);

        setLocalServerInfo((prev) => (prev ? { ...prev, server_image: previewUrl } : undefined));

        return previewUrl;
      } catch (err) {
        console.error("Error handling server image:", err);
        toast({
          title: translation("Error"),
          description: translation("Failed to update server image"),
          variant: "destructive",
        });
        return null;
      }
    },
    [toast] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const updateWelcomeChannel = useCallback((channelName: string) => {
    setLocalServerInfo((prev) => (prev ? { ...prev, welcome_channel: channelName } : undefined));
  }, []);

  const updateLogEnabled = useCallback((enabled: boolean) => {
    setLocalServerInfo((prev) => (prev ? { ...prev, log_enabled: enabled } : undefined));
  }, []);

  const updateLogChannel = useCallback((channelId: string) => {
    setLocalServerInfo((prev) => (prev ? { ...prev, log_channel: channelId } : undefined));
  }, []);

  const hasChanges = useCallback(() => {
    if (!serverInfo || !localServerInfo) return false;

    return (
      serverInfo.server_name !== localServerInfo.server_name ||
      serverInfo.welcome_channel !== localServerInfo.welcome_channel ||
      serverInfo.log_channel !== localServerInfo.log_channel ||
      serverInfo.log_enabled !== localServerInfo.log_enabled ||
      selectedFile !== null
    );
  }, [serverInfo, localServerInfo, selectedFile]);

  const saveSettings = useCallback(async () => {
    if (!serverInfo || !localServerInfo || !hasChanges()) return;

    try {
      setIsSaving(true);
      const formData = new FormData();

      if (serverInfo.server_name !== localServerInfo.server_name) {
        formData.append("server_name", localServerInfo.server_name || "");
      }

      if (selectedFile) {
        formData.append("server_image", selectedFile);
      }

      if (serverInfo.welcome_channel !== localServerInfo.welcome_channel) {
        formData.append("welcome_channel", localServerInfo.welcome_channel || "");
      }

      if (serverInfo.log_channel !== localServerInfo.log_channel) {
        formData.append("log_channel", localServerInfo.log_channel || "");
      }

      if (serverInfo.log_enabled !== localServerInfo.log_enabled) {
        formData.append("log_enabled", String(localServerInfo.log_enabled));
      }

      const response = await fetch(`${baseUrls.API}/api/server-management/update-server`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(translation("Failed to update server settings"));
      }

      await fetchServerInfo();
      setSelectedFile(null);

      toast({
        title: translation("Success"),
        description: translation("Server settings updated successfully"),
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: translation("Error"),
        description: translation("Failed to save server settings"),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [serverInfo, localServerInfo, selectedFile, fetchServerInfo, hasChanges, toast]); // eslint-disable-line react-hooks/exhaustive-deps

  const resetChanges = useCallback(() => {
    setLocalServerInfo(serverInfo);
    setSelectedFile(null);

    if (serverInfo?.server_image) {
      URL.revokeObjectURL(serverInfo.server_image);
    }
  }, [serverInfo]);

  return {
    serverInfo,
    localServerInfo,
    isLoading,
    isSaving,
    hasChanges,
    updateServerName,
    updateServerPhoto,
    updateWelcomeChannel,
    updateLogEnabled,
    updateLogChannel,
    saveSettings,
    resetChanges,
  };
};
