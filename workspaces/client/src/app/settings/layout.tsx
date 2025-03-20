"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  Users,
  Shield,
  FileText,
  Server,
  UserX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface NavItem {
  name: string;
  icon: ReactNode;
  path: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const pathname = usePathname();
  const translation = useTranslation();

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setCollapsed(mobile);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const navItems: NavItem[] = [
    {
      name: translation("Server Settings"),
      icon: <Settings size={20} />,
      path: "/settings",
    },
    {
      name: translation("Roles"),
      icon: <Shield size={20} />,
      path: "/settings/roles",
    },
    {
      name: translation("Users"),
      icon: <Users size={20} />,
      path: "/settings/user-management",
    },
    {
      name: translation("Logs"),
      icon: <FileText size={20} />,
      path: "/settings/logs",
    },
    {
      name: translation("Technical Details"),
      icon: <Server size={20} />,
      path: "/settings/technical-details",
    },
    {
      name: translation("AutoMod"),
      icon: <Shield size={20} />,
      path: "/settings/auto-mod",
    },
    {
      name: translation("Bans Management"),
      icon: <UserX size={20} />,
      path: "/settings/bans-management",
    },
  ];

  const toggleSidebar = (): void => {
    setCollapsed(!collapsed);
  };

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
          h-full transition-all duration-300 border-r bg-background
          flex flex-col
        `}
      >
        <div className="p-4 flex items-center justify-between">
          {!collapsed && <h1 className="text-xl font-bold">Dashboard</h1>}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-gray-400 hover:text-white"
            onClick={toggleSidebar}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="space-y-1 px-2 py-4">
            {navItems.map((item) => (
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
            ))}
          </nav>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
