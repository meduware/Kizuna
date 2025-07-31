import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GlobalContextProvider } from "./GlobalContext";
import { UserContextProvider } from "./general/user";
import { ServerContextProvider } from "./general/server/ServerContext";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <GlobalContextProvider>
      <ServerContextProvider>
        <UserContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <SpeedInsights />
            <Toaster />
          </ThemeProvider>
        </UserContextProvider>
      </ServerContextProvider>
    </GlobalContextProvider>
  );
}
