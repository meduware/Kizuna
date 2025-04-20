import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateChannelDialogProps } from "@shared/types";
import { useTranslation } from "@/hooks/useTranslation";
import { Label } from "@/components/ui/label";
import { apiHandler } from "@/lib/handlers/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalContext } from "@/context/GlobalContext";
import { reloadServerList } from "@/lib/utils";
import { useChannelActions } from "@/hooks/settings/useChannelActions";

export default function CreateChannelDialog({
  isOpen,
  onClose,
}: CreateChannelDialogProps) {
  const { currentServer, setCurrentServer } = useGlobalContext();
  const { createChannel } = useChannelActions();
  const [channelDetails, setChannelDetails] = useState({
    channel_name: "",
    channel_description: "",
    channel_type: "text",
  });

  const translation = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{translation("Create New Channel")}</DialogTitle>
          <DialogDescription>
            {translation("Add a new channel to your server")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium">
              {translation("Channel Name")}
            </Label>
            <Input
              id="name"
              placeholder={translation("Enter Channel Type")} 
              value={channelDetails.channel_name}
              onChange={(e) =>
                setChannelDetails(() => ({
                  ...channelDetails,
                  channel_name: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-sm font-medium">
              {translation("Channel Description")}
            </Label>
            <Input
              id="description"
              placeholder={translation(`Enter channel description`)}
              value={channelDetails.channel_description}
              onChange={(e) =>
                setChannelDetails(() => ({
                  ...channelDetails,
                  channel_description: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="channel-type">{translation("Channel Type")}</Label>
            <Select
              value={channelDetails.channel_type}
              onValueChange={(e: "text" | "voice") => {
                setChannelDetails(() => ({
                  ...channelDetails,
                  channel_type: e,
                }));
              }}
            >
              <SelectTrigger id="channel-type">
                <SelectValue placeholder={translation("Change Channel Type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">{translation("Text")}</SelectItem>
                <SelectItem value="voice">{translation("Voice")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {translation("Cancel")}</Button>
          <Button onClick={() => createChannel(channelDetails)}>
           {translation("Create Role")} 
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
