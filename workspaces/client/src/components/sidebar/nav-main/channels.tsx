"use client";

import { Hash, Volume2 } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import Link from "next/link";

type typeChannel = {
  id: number;
  channel_name: string;
  channel_type: "text" | "voice";
  channel_description: string;
  channel_permissions: {};
};

export function Channels({ channels }: { channels: typeChannel[] }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {channels.map((channel: typeChannel, index: number) => (
          <Link key={index} href={`/channels/${channel.id}`} className="w-full">
            <SidebarMenuItem className="hover:bg-secondary p-2 rounded-md hover:cursor-pointer text-foreground flex gap-2 items-center">
              {channel.channel_type === "text" ? (
                <Hash className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
              <span className="text-sm">{channel.channel_name}</span>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
