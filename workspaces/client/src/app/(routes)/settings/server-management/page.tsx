"use client";

import { Button } from "@/components/ui/button";
import { ServerIdentityCard } from "./ServerIdentityCard";
import { WelcomeSettingsCard } from "./WelcomeSettingsCard";
import { LogSettingsCard } from "./LogSettingsCard";
import { useServerSettings } from "@/hooks/useServerSettings";
import { Save, RefreshCw } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LoadingSpinner } from "@/components/(routes)/settings/LoadingSpinner";

export default function ServerOverview() {
  const translation = useTranslation();

  const {
    localServerInfo,
    isLoading,
    hasChanges,
    resetChanges,
    updateServerName,
    updateServerPhoto,
    updateWelcomeChannel,
    updateLogEnabled,
    updateLogChannel,
    saveSettings,
  } = useServerSettings();

  if (isLoading) {
    return (
      <LoadingSpinner message={translation("Loading server settings...")} />
    );
  }

  if (!localServerInfo) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {translation("Server Overview Settings")}
        </h1>
      </div>
      <div className="w-full space-y-4">
        <ServerIdentityCard
          serverName={localServerInfo.server_name}
          serverPhoto={localServerInfo.server_image}
          onServerNameChange={updateServerName}
          onPhotoChange={updateServerPhoto}
        />

        <WelcomeSettingsCard
          welcomeChannel={localServerInfo.welcome_channel}
          channels={localServerInfo.channels}
          onWelcomeChannelChange={updateWelcomeChannel}
        />

        <LogSettingsCard
          logEnabled={localServerInfo.log_enabled}
          logChannel={localServerInfo.log_channel}
          channels={localServerInfo.channels}
          onLogEnabledChange={updateLogEnabled}
          onLogChannelChange={updateLogChannel}
        />
        <div className="flex justify-end gap-2 max-sm:flex-col-reverse">
          <Button
            variant={"outline"}
            onClick={resetChanges}
            className="px-8 max-sm:w-full"
            disabled={!hasChanges()}
          >
            <RefreshCw size={20} className="mr-2" />
            {translation("Reset Changes")}
          </Button>
          <Button
            onClick={saveSettings}
            className="px-8 max-sm:w-full"
            disabled={!hasChanges()}
          >
            <Save size={20} className="mr-2" />
            {translation("Save Changes")}
          </Button>
        </div>
      </div>
    </div>
  );
}
