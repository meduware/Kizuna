"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC } from "react";
import { Channel } from "@shared/types";
import { useTranslation } from "@/hooks/useTranslation";

interface LogSettingsProps {
  logEnabled: boolean;
  logChannel: string;
  channels: Channel[];
  onLogEnabledChange: (enabled: boolean) => void;
  onLogChannelChange: (channelId: string) => void;
}

export const LogSettingsCard: FC<LogSettingsProps> = ({
  logEnabled,
  logChannel,
  channels,
  onLogEnabledChange,
  onLogChannelChange,
}) => {
  const translation = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{translation("Log Settings")}</CardTitle>
        <CardDescription>
          {translation("Configure how user activity is logged in your server")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="log-enabled">{translation("Enable New User Logs")}</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={logEnabled}
              onCheckedChange={(checked) => onLogEnabledChange(checked as boolean)}
            />
          </div>
        </div>

        {logEnabled && (
          <div className="space-y-2">
            <Label htmlFor="log-channel">{translation("Log Channel")}</Label>
            <Select value={logChannel} onValueChange={onLogChannelChange}>
              <SelectTrigger id="log-channel">
                <SelectValue placeholder={translation("Select a channel")} />
              </SelectTrigger>
              <SelectContent>
                {channels.map((channel) => (
                  <SelectItem key={channel.id} value={channel.id}>
                    #{channel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {translation("All new user join events will be posted to this channel")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
