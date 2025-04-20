import { ChannelProvider } from "@/context/settings/ChannelContext";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChannelProvider>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Ayarlar</h1>
        {children}
      </div>
    </ChannelProvider>
  );
}
