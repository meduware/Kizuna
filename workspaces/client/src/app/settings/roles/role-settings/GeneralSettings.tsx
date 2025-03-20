import { Input } from "@/components/ui/input";
import { RoleGeneralSettingsProps } from "@shared/types";

export function RoleGeneralSettings({
  roleName,
  roleColor,
  onRoleNameChange,
  onRoleColorChange,
}: RoleGeneralSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <label htmlFor="roleName" className="text-sm font-medium">
          Role Name
        </label>
        <Input id="roleName" value={roleName} onChange={(e) => onRoleNameChange(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="roleColor" className="text-sm font-medium">
          Role Color
        </label>
        <div className="flex items-center gap-2">
          <Input
            id="roleColor"
            type="color"
            value={roleColor}
            onChange={(e) => onRoleColorChange(e.target.value)}
            className="w-12 h-8 p-1 rounded"
          />
          <span className="text-sm text-gray-500">{roleColor}</span>
        </div>
      </div>
    </div>
  );
}
