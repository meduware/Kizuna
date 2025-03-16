"use client";

import { Hash, Volume2 } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Channel } from "@/lib/types";
import { useGlobalContext } from "@/context/store";

export function Channels({ channels }: { channels: Channel[] }) {
  const { changeChannel, currentServer, currentChannel, setCurrentChannel } =
    useGlobalContext();

  if (!currentServer) return null;
  return (
    <SidebarGroup>
      <SidebarMenu>
        {channels.map((channel: Channel, index: number) => (
          <SidebarMenuItem
            key={index}
            onClick={() =>
              changeChannel(
                channel.id,
                currentServer.technical_details.ipAddress,
                currentServer.technical_details.port,
                setCurrentChannel,
              )
            }
            className={`hover:bg-secondary ${channel.id === currentChannel && "bg-secondary"} p-2 rounded-md hover:cursor-pointer text-foreground flex gap-2 items-center`}
          >
            {channel.channel_type === "text" ? (
              <Hash className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
            <span className="text-sm">{channel.channel_name}</span>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
