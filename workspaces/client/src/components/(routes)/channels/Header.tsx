import { ModeToggle } from "@/components/(routes)/marketing/Navbar/ModeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGlobalContext } from "@/context/GlobalContext";
import { Hash, Volume2 } from "lucide-react";
import React from "react";

const Header = () => {
  const { currentServer, currentUser, currentChannel } = useGlobalContext();

  const currentChannelData = currentServer?.channels.find(
    (channel) => channel.id === currentChannel,
  );
  return (
    <header className="sticky top-0 z-50 shadow-sm flex h-16 justify-center items-center gap-2">
      {currentChannelData && currentUser && (
        <div className="flex items-center w-full gap-2 px-4">
          {currentChannelData.channel_type === "text" ? (
            <Hash className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm xl:max-w-[270px] max-w-[150px] truncate">
            {currentChannelData.channel_name}
          </span>
          <div className="hidden sm:contents">
            <span> | </span>
            <span className="text-xs text-muted-foreground truncate xl:max-w-[500px] sm:max-w-[170px]">
              {currentChannelData.channel_description}
            </span>
          </div>
        </div>
      )}
      <div className="flex justify-end w-full gap-2 px-4">
        <SidebarTrigger />
        <ModeToggle />
        <LangToggle />
      </div>
    </header>
  );
};

export default Header;
