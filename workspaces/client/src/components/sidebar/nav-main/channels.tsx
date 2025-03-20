"use client";

import { Hash, Volume2 } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Channel } from "@/lib/types";
import { useGlobalContext } from "@/context/store";

export function Channels({ channels }: { channels: Channel[] }) {
  const { changeChannel, currentServer, currentChannel, setCurrentChannel } =
    useGlobalContext();
  const { toggleSidebar, isMobile } = useSidebar();

  function handleChangeChannel(
    channel_id: number,
    ipAddress: string,
    port: number,
  ) {
    if (!currentServer) return;
    changeChannel(channel_id, ipAddress, port, setCurrentChannel);
    if (isMobile) toggleSidebar();
  }

  if (!currentServer) return null;
  return (
    <SidebarGroup>
      <SidebarMenu>
        {channels.map((channel: Channel, index: number) => (
          <SidebarMenuItem
            key={index}
            onClick={() =>
              handleChangeChannel(
                channel.id,
                currentServer.technical_details.ipAddress,
                currentServer.technical_details.port,
              )
            }
            className={`hover:bg-sidebar-accent text-foreground/50 ${channel.id === currentChannel && "bg-sidebar-accent text-foreground"} p-2 rounded-md hover:cursor-pointer flex gap-2 items-center transition-all`}
          >
            {channel.channel_type === "text" ? (
              <Hash className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
            <span className="text-sm truncate max-w-[170px]">
              {channel.channel_name}
            </span>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
