import { RolePermissionsProps } from "@shared/types";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "@/hooks/useTranslation";

export function RolePermissions({
  permissionCategories,
  activePermissions,
  onTogglePermission,
}: RolePermissionsProps) {
  const translation = useTranslation();
  return (
    <div className="space-y-6">
      {permissionCategories.map((category) => (
        <div key={category.name} className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {translation(category.name)}
          </h3>
          <div className="space-y-2">
            {category.permissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800"
              >
                <div className="flex-1">
                  <p className="font-medium">{permission.label}</p>
                </div>
                <Switch
                  checked={!!activePermissions[permission.id]}
                  onCheckedChange={() => onTogglePermission(permission.id)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
