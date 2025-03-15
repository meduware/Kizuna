import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

const LoadingTabs = () => {
  const translation = useTranslation();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <Tabs defaultValue="channels" className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-2 animate-pulse">
          <TabsTrigger value="channels">{translation("Channels")}</TabsTrigger>
          <TabsTrigger value="users">{translation("Users")}</TabsTrigger>
        </TabsList>

        <TabsContent value="channels" className="mt-4">
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 3 }).map((_, index) => (
                <SidebarMenuItem
                  key={index}
                  className="bg-secondary p-2 rounded-md hover:cursor-pointer animate-pulse text-foreground flex gap-2 items-center"
                >
                  <span className="text-sm h-4"></span>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </TabsContent>
        <TabsContent value="users" className="mt-4">
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 5 }).map((_, index) => (
                <SidebarMenuItem
                  key={index}
                  className="bg-secondary p-2 rounded-md hover:cursor-pointer animate-pulse text-foreground flex gap-2 items-center"
                >
                  <span className="text-sm h-4"></span>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </TabsContent>
      </Tabs>
    </SidebarGroup>
  );
};

export default LoadingTabs;
