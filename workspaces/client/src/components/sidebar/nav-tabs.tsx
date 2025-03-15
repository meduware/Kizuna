"use client";

import { Folder, Forward } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Channels } from "./nav-main/channels";
import { Users } from "./nav-main/users";
import { useTranslation } from "@/hooks/useTranslation";
import { useGlobalContext } from "@/context/store";

export function NavTabs() {
  const { currentServer, loading } = useGlobalContext();
  const translation = useTranslation();

  if (loading || !currentServer) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <Tabs defaultValue="channels" className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-2">
          <TabsTrigger value="channels">{translation("Channels")}</TabsTrigger>
          <TabsTrigger value="users">{translation("Users")}</TabsTrigger>
        </TabsList>

        <TabsContent value="channels" className="mt-4">
          <Channels channels={currentServer.channels} />
        </TabsContent>
        <TabsContent value="users" className="mt-4">
          <Users roles={currentServer.roles} />
        </TabsContent>
      </Tabs>
    </SidebarGroup>
  );
}
