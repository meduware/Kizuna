"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Role } from "@/lib/types";

export function Users({ roles }: { roles: Role[] }) {
  return (
    <SidebarGroup>
      {roles.map((role, roleIndex) => (
        <div key={roleIndex}>
          <SidebarGroupLabel className="space-x-1">
            <span className="max-w-[170px] truncate">{role.role_name}</span>
            <span> - {role.users.length}</span>
          </SidebarGroupLabel>
          <SidebarMenu>
            {role.users.map((user, userIndex) => (
              <SidebarMenuItem
                key={userIndex}
                className="flex justify-start items-center space-x-5 mb-2 hover:bg-secondary p-2 rounded-md hover:cursor-pointer"
              >
                <Avatar>
                  <AvatarImage
                    src={user.photo_url}
                    className="w-8 h-8 rounded-full overflow-hidden object-cover"
                  />
                  <AvatarFallback className="text-sm font-semibold">
                    {user.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="font-medium flex flex-col justify-start items-center  ">
                  <span
                    className="text-sm max-w-[140px] truncate"
                    style={{ color: role.role_color }}
                  >
                    {user.username}
                  </span>
                </div>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      ))}
    </SidebarGroup>
  );
}
