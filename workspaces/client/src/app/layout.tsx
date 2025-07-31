import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ContextProviders } from "@/context/ContextProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kizuna: Open-Source Solution for Secure Communication",
  description:
    "A self-hosted, open-source chat app tailored for secure and private communication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`flex flex-col ${inter}`}>
        <ContextProviders>{children}</ContextProviders>
      </body>
    </html>
  );
}
