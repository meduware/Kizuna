import { Hash, PlusCircle, Volume2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useGlobalContext } from "@/context/GlobalContext";
import { Channel } from "@shared/types";
import { useTranslation } from "@/hooks/useTranslation";
import {
  useChannelContext,
  useChannelSettingsHook,
} from "@/context/settings/channels";

export function ChannelList({
  handleDialogOpen,
}: {
  handleDialogOpen: (open: boolean) => void;
}) {
  const translation = useTranslation();
  const { currentServer } = useGlobalContext();
  const { activeChannel } = useChannelContext();
  const { changeActiveChannel } = useChannelSettingsHook();

  const channels = currentServer?.channels || [];

  return (
    <Card className="lg:w-1/4 md:min-w-[300px] h-2/3 lg:h-full">
      <ScrollArea className="h-full">
        <CardHeader className="sm:px-4">
          <CardTitle>{translation("Channels")}</CardTitle>
          <CardDescription>
            {translation(
              "Select a channel to edit its permissions or create one!",
            )}
          </CardDescription>
          <div className="w-full pt-4">
            <Button
              className="gap-2 w-full"
              onClick={() => handleDialogOpen(true)}
            >
              <PlusCircle size={16} />
              {translation("Create Channel")}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 h-full sm:px-4">
          {channels
            .slice()
            .sort((a, b) => a.index - b.index)
            .map((channel) => (
              <div
                key={channel.id}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border ${activeChannel && channel.id === activeChannel.id
                    ? "border-primary"
                    : "border hover:bg-secondary"
                  }`}
                onClick={() => changeActiveChannel(channel as Channel)}
              >
                <div className="flex relative items-center gap-3">
                  <div className="w-4 h-4 rounded-full absolute text-muted-foreground">
                    {channel.channel_type === "text" ? (
                      <Hash className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </div>
                  <span className="font-medium pl-6">
                    {channel.channel_name}
                  </span>
                </div>
              </div>
            ))}
        </CardContent>
        <ScrollBar />
      </ScrollArea>
    </Card>
  );
}
