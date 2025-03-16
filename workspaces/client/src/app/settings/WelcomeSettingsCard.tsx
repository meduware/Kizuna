"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

interface WelcomeSettingsProps {
  welcomeChannel: string;
  channels: Channel[];
  onWelcomeChannelChange: (channelId: string) => void;
}

export const WelcomeSettingsCard: FC<WelcomeSettingsProps> = ({
  welcomeChannel,
  channels,
  onWelcomeChannelChange,
}) => {
  const translation = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{translation("Welcome Settings")}</CardTitle>
        <CardDescription>
          {translation("Configure what new users see when they first join your server")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="welcome-channel">{translation("Default Welcome Channel")}</Label>
          <Select value={welcomeChannel} onValueChange={onWelcomeChannelChange}>
            <SelectTrigger id="welcome-channel">
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
            {translation("This is the first channel users will see when they join your server")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
