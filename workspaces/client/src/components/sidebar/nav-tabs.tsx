"use client";

import { Folder, Forward } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Channels } from "./nav-main/channels";
import { Users } from "./nav-main/users";

export function NavTabs() {
  const items = {
    navMain: [
      {
        title: "Playground",
        url: "#",
        icon: Folder,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Forward,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
    ],
    users: [
      {
        username: "Swaginman",
        userImage: "https://i.pinimg.com/736x/50/e2/ec/50e2ec019f051db8d374af845ae3f813.jpg",
      },
      {
        username: "Swaginman",
        userImage: "https://i.pinimg.com/736x/50/e2/ec/50e2ec019f051db8d374af845ae3f813.jpg",
      },
      {
        username: "Swaginman",
        userImage: "https://i.pinimg.com/736x/50/e2/ec/50e2ec019f051db8d374af845ae3f813.jpg",
      },
      {
        username: "Swaginman",
        userImage: "https://i.pinimg.com/736x/50/e2/ec/50e2ec019f051db8d374af845ae3f813.jpg",
      },
      {
        username: "Swaginman",
        userImage: "https://i.pinimg.com/736x/50/e2/ec/50e2ec019f051db8d374af845ae3f813.jpg",
      },
      {
        username: "Medusa Collins",
        userImage: "https://avatars.githubusercontent.com/u/63819815?v=4",
      },
      {
        username: "Medusa Collins",
        userImage: "https://avatars.githubusercontent.com/u/63819815?v=4",
      },
      {
        username: "Medusa Collins",
        userImage: "https://avatars.githubusercontent.com/u/63819815?v=4",
      },
      {
        username: "Medusa Collins",
        userImage: "https://avatars.githubusercontent.com/u/63819815?v=4",
      },
    ],
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Label Text????</SidebarGroupLabel>
      <Tabs defaultValue="channels" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="channels" className="mt-4">
          <Channels items={items.navMain} />
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Users items={items.users} />
        </TabsContent>
      </Tabs>
    </SidebarGroup>
  );
}
