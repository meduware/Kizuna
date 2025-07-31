"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import {
  Settings,
  Users,
  Shield,
  FileText,
  Server,
  UserX,
  ChevronLeft,
  Hash,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useGlobalContext } from "@/context/GlobalContext";

interface NavItem {
  name: string;
  icon: ReactNode;
  path: string;
  permission: boolean;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { currentUser, currentServer } = useGlobalContext();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const pathname = usePathname();
  const translation = useTranslation();

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1124;
      setIsMobile(mobile);
      setCollapsed(mobile);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (
        isMobile &&
        !collapsed &&
        sidebar &&
        !sidebar.contains(event.target as Node)
      ) {
        setCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, collapsed]);

  // TODO: Create a design for this section.
  if (!currentUser) {
    return <div>{translation("You need to be logged in to see this page.")}</div>;
  }

  if (!currentServer || !currentUser.role.permissions.access_server_settings) {
    redirect("/channels");
  }

  const navItems: NavItem[] = [
    {
      name: translation("Server Settings"),
      icon: <Settings size={20} />,
      path: "/settings/server-management",
      permission: currentUser.role.permissions.manage_server,
    },
    {
      name: translation("Channels"),
      icon: <Hash size={20} />,
      path: "/settings/channels",
      permission: currentUser.role.permissions.manage_channel,
    },
    {
      name: translation("Roles"),
      icon: <Shield size={20} />,
      path: "/settings/roles",
      permission: currentUser.role.permissions.manage_roles,
    },
    {
      name: translation("Users"),
      icon: <Users size={20} />,
      path: "/settings/user-management",
      permission: currentUser.role.permissions.manage_users,
    },
    {
      name: translation("Logs"),
      icon: <FileText size={20} />,
      path: "/settings/logs",
      permission: currentUser.role.permissions.manage_logs,
    },
    {
      name: translation("Technical Details"),
      icon: <Server size={20} />,
      path: "/settings/technical-details",
      permission: currentUser.role.permissions.manage_technical_details,
    },
    {
      name: translation("AutoMod"),
      icon: <Shield size={20} />,
      path: "/settings/auto-mod",
      permission: currentUser.role.permissions.manage_automod,
    },
    {
      name: translation("Bans Management"),
      icon: <UserX size={20} />,
      path: "/settings/bans-management",
      permission: currentUser.role.permissions.manage_bans,
    },
  ];

  const checkPermission = (path: string) => {
    const item = navItems.find((item) => item.path === path);
    if (item) {
      if (!item.permission) {
        redirect("/channels");
      }
    }
  };

  if (pathname) {
    checkPermission(pathname);
  }

  return (
    <div className="h-screen flex">
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setCollapsed(true)}
        />
      )}

      <div
        id="sidebar"
        className={`
          ${isMobile && !collapsed ? "fixed left-0 top-0 bottom-0 z-50" : isMobile ? "w-16" : ""}
          ${collapsed ? "w-16" : "w-64"}
          h-full transition-all duration-300 border-r bg-sidebar
          flex flex-col
        `}
      >
        <div className="p-4 flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold">{translation("Dashboard")}</h1>
          )}

          <Link href="/channels" className="text-3xl font-bold text-left">
            <ChevronLeft size={20} />
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="space-y-1 px-2 py-4">
            {navItems.map(
              (item) =>
                item.permission && (
                  <Link
                    href={item.path}
                    key={item.name}
                    className={`flex items-center ${collapsed ? "justify-center" : "justify-start"}
                px-3 py-3 rounded-md transition-colors
                group hover:bg-secondary
                ${pathname === item.path ? "bg-secondary" : ""}`}
                    onClick={() => isMobile && setCollapsed(true)}
                  >
                    <div className="flex items-center">
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!collapsed && <span className="ml-3">{item.name}</span>}
                    </div>
                    {collapsed && (
                      <div className="absolute left-16 truncate bg-secondary transform p-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                        {item.name}
                      </div>
                    )}
                  </Link>
                ),
            )}
          </nav>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
