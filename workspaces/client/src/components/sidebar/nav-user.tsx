"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useGlobalContext } from "@/context/store";
import { useTranslation } from "@/hooks/useTranslation";
import LoginDialog from "@/app/auth/login/login-dialog";
import { useState } from "react";
import { Button } from "../ui/button";

export function NavUser() {
  const { currentUser, currentServer, changeUser, loading } =
    useGlobalContext();
  const { isMobile } = useSidebar();
  const translation = useTranslation();
  const [loginDialog, setLoginDialog] = useState(false);
  // TODO: Need some sort of design for this.

  if (!currentUser || loading) {
    if (!currentServer || loading) {
      return <></>;
    }

    return (
      <>
        <Button
          onClick={() => setLoginDialog(true)}
          className="grid flex-1 text-left text-sm leading-tight truncate font-semibold"
        >
          <span>{translation("Click to login")}</span>
        </Button>
        <LoginDialog
          isOpen={loginDialog}
          onClose={() => setLoginDialog(false)}
        />
      </>
    );
  } else {
    const user = {
      name: currentUser.user_metadata.username,
      email: currentUser.user_metadata.email,
      avatar: currentUser.user_metadata.photo_url,
    };

    const logout = () => {
      changeUser("");
    };

    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-secondary hover:bg-secondary"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }
}
