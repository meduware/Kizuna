"use client";

import { Button } from "@/components/ui/button";
import { ServerIdentityCard } from "./ServerIdentityCard";
import { WelcomeSettingsCard } from "./WelcomeSettingsCard";
import { LogSettingsCard } from "./LogSettingsCard";
import { useServerSettings } from "@/hooks/useServerSettings";
import { useTranslation } from "@/hooks/useTranslation";

export default function ServerOverview() {
  const initialServer = {
    serverName: "Deep Server",
    serverPhoto:
      "https://rzaovnuywoiiquidnqhe.supabase.co/storage/v1/object/public/avatars/avatars/f7c8c7d1-e9af-41a2-b75d-86a98ac7292b.jpg",
    welcomeChannel: "MIGHTY WAVY STREAM",
    logEnabled: true,
    logChannel: "EAGLE DEEP",
    channels: [
      { id: "MIGHTY WAVY STREAM", name: "MIGHTY WAVY STREAM" },
      { id: "general", name: "general" },
      { id: "welcome", name: "welcome" },
      { id: "announcements", name: "announcements" },
      { id: "EAGLE DEEP", name: "EAGLE DEEP" },
      { id: "logs", name: "logs" },
    ],
  };
  const translation = useTranslation();

  const {
    serverInfo,
    updateServerName,
    updateServerPhoto,
    updateWelcomeChannel,
    updateLogEnabled,
    updateLogChannel,
    saveSettings,
  } = useServerSettings(initialServer);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {translation("Server Overview Settings")}
        </h1>
        <Button onClick={saveSettings}>{translation("Save Changes")}</Button>
      </div>
      <div className="w-full space-y-4">
        <ServerIdentityCard
          serverName={serverInfo.serverName}
          serverPhoto={serverInfo.serverPhoto}
          onServerNameChange={updateServerName}
          onPhotoChange={updateServerPhoto}
        />

        <WelcomeSettingsCard
          welcomeChannel={serverInfo.welcomeChannel}
          channels={serverInfo.channels}
          onWelcomeChannelChange={updateWelcomeChannel}
        />

        <LogSettingsCard
          logEnabled={serverInfo.logEnabled}
          logChannel={serverInfo.logChannel}
          channels={serverInfo.channels}
          onLogEnabledChange={updateLogEnabled}
          onLogChannelChange={updateLogChannel}
        />
      </div>
    </div>
  );
}
