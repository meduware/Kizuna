import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "./MultiSelect";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface AdvancedTabProps {
  notificationChannel: string;
  logAllActions: boolean;
  dmNotifications: boolean;
  quarantineMode: boolean;
  exemptedRoles: string[];
  onNotificationChannelChange: (value: string) => void;
  onLogAllActionsChange: (value: boolean) => void;
  onDmNotificationsChange: (value: boolean) => void;
  onQuarantineModeChange: (value: boolean) => void;
  onExemptedRolesChange: (roles: string[]) => void;
}

export function AdvancedTab({
  notificationChannel,
  logAllActions,
  dmNotifications,
  quarantineMode,
  exemptedRoles,
  onNotificationChannelChange,
  onLogAllActionsChange,
  onDmNotificationsChange,
  onQuarantineModeChange,
  onExemptedRolesChange,
}: AdvancedTabProps) {
  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "moderator", label: "Moderator" },
    { value: "trusted", label: "Trusted Member" },
    { value: "vip", label: "VIP" },
  ];

  const handleRolesChange = (selectedRoles: string[]) => {
    onExemptedRolesChange(selectedRoles);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield size={20} />
          Advanced AutoMod Settings
        </CardTitle>
        <CardDescription>Fine-tune your automated moderation system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="notification-channel">Notification Channel</Label>
          <Select value={notificationChannel} onValueChange={onNotificationChannelChange}>
            <SelectTrigger id="notification-channel">
              <SelectValue placeholder="Select a channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None (Disabled)</SelectItem>
              <SelectItem value="mod-logs">#mod-logs</SelectItem>
              <SelectItem value="automod-alerts">#automod-alerts</SelectItem>
              <SelectItem value="admin-only">#admin-only</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Choose where AutoMod should send notifications about actions taken
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="log-all-actions">Log All AutoMod Actions</Label>
            <Switch
              id="log-all-actions"
              checked={logAllActions}
              onCheckedChange={onLogAllActionsChange}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Keep a detailed log of all actions taken by AutoMod
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="dm-notifications">DM Users on Actions</Label>
            <Switch
              id="dm-notifications"
              checked={dmNotifications}
              onCheckedChange={onDmNotificationsChange}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Send direct messages to users when AutoMod takes action against them
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="quarantine-mode">Quarantine Mode</Label>
            <Switch
              id="quarantine-mode"
              checked={quarantineMode}
              onCheckedChange={onQuarantineModeChange}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Instead of taking action immediately, hold messages for moderator review
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="exempted-roles">Exempted Roles</Label>
          <MultiSelect
            id="exempted-roles"
            options={roleOptions}
            value={exemptedRoles}
            onChange={handleRolesChange}
            placeholder="Select exempted roles"
          />
          <p className="text-xs text-muted-foreground">
            Users with these roles will not be affected by AutoMod
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Reset to Default Settings
        </Button>
      </CardFooter>
    </Card>
  );
}
