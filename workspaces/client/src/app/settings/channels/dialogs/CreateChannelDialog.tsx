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
import { useGlobalContext } from "@/context/store";
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

  const translate = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{translate("Create New Channel")}</DialogTitle>
          <DialogDescription>
            {translate("Add a new channel to your server")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium">
              {translate("Channel Name")}
            </Label>
            <Input
              id="name"
              placeholder="Enter Channel Type"
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
              {translate("Channel Description")}
            </Label>
            <Input
              id="description"
              placeholder={translate(`Enter channel description`)}
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
            <Label htmlFor="channel-type">{translate("Channel Type")}</Label>
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
                <SelectValue placeholder={translate("Change Channel Type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="voice">Voice</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => createChannel(channelDetails)}>
            Create Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
