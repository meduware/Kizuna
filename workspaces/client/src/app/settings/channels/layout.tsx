import { ChannelProvider } from "@/context/settings/ChannelContext";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChannelProvider>
      <div className="p-4">{children}</div>
    </ChannelProvider>
  );
}
