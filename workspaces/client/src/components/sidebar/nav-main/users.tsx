"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function Users({
  items,
}: {
  items: {
    username: string;
    userImage?: string;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Users?????????????</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          <SidebarMenuItem key={index} className="flex justify-start items-center space-x-5 mb-2">
            <Avatar>
              <AvatarImage
                src={item.userImage}
                className="w-8 h-8 rounded-full overflow-hidden object-cover"
              />
              <AvatarFallback className="text-sm font-semibold">
                {item.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="font-medium flex flex-col justify-start -mt-2 truncate">
              <span className="text-lg hover:cursor-pointer w-fit">{item.username}</span>
            </div>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
