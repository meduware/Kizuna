import React from "react";

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`flex flex-col`}>{children}</body>
    </html>
  );
}
