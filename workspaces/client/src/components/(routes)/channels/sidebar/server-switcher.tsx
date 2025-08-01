"use client";

import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import { useGlobalContext } from "@/context/GlobalContext";
import { useState } from "react";
import { Server } from "@/lib/types";
import LoadingServerSwitcher from "./nav-main/loadingServerSwitcher";
import { IpDialog } from "@/components/(routes)/channels/auth/ipDialog";
import LoginDialog from "@/components/(routes)/channels/auth/login/login-dialog";

export function ServerSwitcher() {
  const { currentServer, changeServer, serverList, loading } =
    useGlobalContext();
  const { isMobile } = useSidebar();
  const [ipDialog, setIpDialog] = useState(false);
  const [loginDialog, setLoginDialog] = useState(false);

  const translation = useTranslation();

  if (loading) {
    return <LoadingServerSwitcher />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-accent hover:bg-accent"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentServer && currentServer.server_name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              {translation("Servers")}
            </DropdownMenuLabel>
            {serverList.map((server: Server, index: number) => (
              <DropdownMenuItem
                key={index}
                onClick={() =>
                  changeServer({
                    ipAddress: server.technical_details.ipAddress,
                    port: server.technical_details.port,
                  })
                }
                className={`gap-2 p-2 cursor-pointer ${currentServer &&
                  currentServer.technical_details.ipAddress ===
                  server.technical_details.ipAddress &&
                  currentServer.technical_details.port ===
                  server.technical_details.port &&
                  "bg-secondary/50"
                  }`}
              >
                <div className="flex size-6 items-center justify-center rounded-full">
                  <Image
                    src={server.server_image}
                    className="size-6 object-cover rounded-full"
                    alt={server.server_name}
                    width={100}
                    height={100}
                  />
                </div>
                {server.server_name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2 cursor-pointer"
              onClick={() => setIpDialog(true)}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                {translation("Add server")}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <IpDialog
        isOpen={ipDialog}
        onClose={() => setIpDialog(false)}
        isAvailable={() => setLoginDialog(true)}
      />
      <LoginDialog isOpen={loginDialog} onClose={() => setLoginDialog(false)} />
    </SidebarMenu>
  );
}
