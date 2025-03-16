"use client";
import { ModeToggle } from "@/components/(mainpage)/Navbar/ModeToggle";
import MessageInput from "@/components/message/MessageInput";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 justify-center items-center gap-2">
          <div className="flex justify-end w-full gap-2 px-4">
            <SidebarTrigger />
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-col gap-4 p-4 pt-0">
          <MessageInput />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
