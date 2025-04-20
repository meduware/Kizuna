import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useChannelContext } from "@/context/settings/ChannelContext";
import { useChannelActions } from "@/hooks/settings/useChannelActions";
import { useTranslation } from "@/hooks/useTranslation";

export function Permissions({ section }: { section: string }) {
  const { activeRole, form } = useChannelContext();
  const { changeForm } = useChannelActions();
  const translation = useTranslation();

  if (section == "role_permissions" && !activeRole) return null;

  const currentForm =
    section == "role_permissions"
      ? form?.role_permissions.filter(
        (role) => role.role_details.id === activeRole,
      )[0].permissions
      : form?.channel_permissions;

  if (!currentForm) return null;

  return (
    <div className="space-y-6">
      {Object.entries(currentForm).map(([key, value]: [string, any]) => (
        <div className="space-y-2" key={key}>
          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <div className="flex-1">
              <p className="font-medium">{translation(key)}</p>
            </div>
            <div>
              {typeof value === "boolean" ? (
                <Switch
                  checked={value}
                  onCheckedChange={() =>
                    changeForm({
                      section: section as
                        | "channel_permissions"
                        | "role_permissions"
                        | "channel_details",
                      key,
                      value: !value,
                    })
                  }
                />
              ) : (
                <Input
                  value={value}
                  type="number"
                  onChange={(e) =>
                    changeForm({
                      section: section as
                        | "channel_permissions"
                        | "role_permissions"
                        | "channel_details",
                      key,
                      value: e.target.value ? parseInt(e.target.value, 10) : 0,
                    })
                  }
                  className="w-[140px]"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
