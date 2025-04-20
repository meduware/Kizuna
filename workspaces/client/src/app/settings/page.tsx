"use client";

import { useGlobalContext } from "@/context/store";
import { redirect } from "next/navigation";

interface NavItem {
  path: string;
  permission: boolean;
}

export default function ServerOverview() {
  const { currentUser } = useGlobalContext();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const navItems: NavItem[] = [
    {
      path: "/settings/server-management",
      permission: currentUser.role.permissions.manage_server,
    },
    {
      path: "/settings/channels",
      permission: currentUser.role.permissions.manage_channel,
    },
    {
      path: "/settings/roles",
      permission: currentUser.role.permissions.manage_roles,
    },
    {
      path: "/settings/user-management",
      permission: currentUser.role.permissions.manage_users,
    },
    {
      path: "/settings/logs",
      permission: currentUser.role.permissions.manage_logs,
    },
    {
      path: "/settings/technical-details",
      permission: currentUser.role.permissions.manage_technical_details,
    },
    {
      path: "/settings/auto-mod",
      permission: currentUser.role.permissions.manage_automod,
    },
    {
      path: "/settings/bans-management",
      permission: currentUser.role.permissions.manage_bans,
    },
  ];

  const firstPermission = navItems.find((item) => item.permission);

  if (!firstPermission) {
    redirect("/channels");
  } else {
    redirect(firstPermission.path);
  }
}
