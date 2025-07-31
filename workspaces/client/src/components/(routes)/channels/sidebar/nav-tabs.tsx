"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Channels } from "./nav-main/channels";
import { Users } from "./nav-main/users";
import { useTranslation } from "@/hooks/useTranslation";
import { useGlobalContext } from "@/context/GlobalContext";
import LoadingTabs from "./nav-main/loadingTabs";

export function NavTabs() {
  const { currentServer, loading, currentUser } = useGlobalContext();
  const translation = useTranslation();

  if (loading || !currentServer) {
    return <LoadingTabs />;
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {currentUser && (
        <Tabs defaultValue="channels" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-2">
            <TabsTrigger value="channels">
              {translation("Channels")}
            </TabsTrigger>
            <TabsTrigger value="users">{translation("Users")}</TabsTrigger>
          </TabsList>

          <TabsContent value="channels" className="mt-4">
            <Channels />
          </TabsContent>
          <TabsContent value="users" className="mt-4">
            <Users roles={currentServer.roles} />
          </TabsContent>
        </Tabs>
      )}
    </SidebarGroup>
  );
}
