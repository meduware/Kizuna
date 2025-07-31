import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChannelSettingsHook } from "@/context/settings/channels";
import { useChannelContext } from "@/context/settings/channels/ChannelContext";
import { useTranslation } from "@/hooks/useTranslation";

export function ChannelGeneralSettings() {
  const { form } = useChannelContext();
  const { changeForm } = useChannelSettingsHook();
  const translation = useTranslation();

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="roleName" className="text-sm font-medium">
          {translation("Channel Name")}
        </Label>
        <Input
          id="channelName"
          value={form?.channel_name}
          onChange={(e) =>
            changeForm({
              section: "channel_details",
              key: "channel_name",
              value: e.target.value,
            })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="roleColor" className="text-sm font-medium">
          {translation("Channel Description")}
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="channelDescription"
            value={form?.channel_description}
            onChange={(e) =>
              changeForm({
                section: "channel_details",
                key: "channel_description",
                value: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
        <div>
          <Label htmlFor="power_level">
            {translation("Channel Power Level")}
          </Label>
          <Input
            id="power_level"
            type="number"
            value={form?.power_level}
            onChange={(e) =>
              changeForm({
                section: "channel_details",
                key: "power_level",
                value: e.target.value,
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="channel-index">{translation("Channel Index")}</Label>
          <Input
            id="index"
            type="number"
            value={form?.index}
            onChange={(e) =>
              changeForm({
                section: "channel_details",
                key: "index",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="xl:col-span-1 sm:col-span-2 col-span-1">
          <Label htmlFor="channel-cooldown">
            {translation("Channel Cooldown")}
          </Label>
          <Input
            id="channel-cooldown"
            type="number"
            value={form?.cooldown}
            onChange={(e) =>
              changeForm({
                section: "channel_details",
                key: "cooldown",
                value: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="channel-type">{translation("Channel Type")}</Label>
        <Select
          value={form?.channel_type}
          onValueChange={(e: "text" | "voice") =>
            changeForm({
              section: "channel_details",
              key: "channel_type",
              value: e,
            })
          }
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
  );
}
