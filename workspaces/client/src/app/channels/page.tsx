"use client";
import { ModeToggle } from "@/components/(mainpage)/Navbar/ModeToggle";
import MessageInput from "@/components/message/MessageInput";
import Messages from "@/components/message/Messages";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { LangToggle } from "@/components/ui/LangToggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useGlobalContext } from "@/context/GlobalContext";
import { Hash, Volume2 } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const { currentUser, currentChannel, currentServer } = useGlobalContext();

  const currentChannelData = currentServer?.channels.find(
    (channel) => channel.id === currentChannel,
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 shadow-sm flex h-16 justify-center items-center gap-2">
          {currentChannelData && currentUser && (
            <div className="flex items-center w-full gap-2 px-4">
              {currentChannelData.channel_type === "text" ? (
                <Hash className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
              <span className="text-sm xl:max-w-[270px] max-w-[150px] truncate">
                {currentChannelData.channel_name}
              </span>
              {currentChannelData.channel_description && (
                <div className="hidden sm:contents">
                  <span> | </span>
                  <span className="text-xs text-muted-foreground truncate xl:max-w-[500px] sm:max-w-[170px]">
                    {currentChannelData.channel_description}
                  </span>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end w-full gap-2 px-4">
            <SidebarTrigger />
            <ModeToggle />
            <LangToggle />
          </div>
        </header>
        <div className="absolute h-full w-full">
          <div className="flex flex-col justify-between h-full gap-4">
            <Messages />
          </div>
          <MessageInput />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
