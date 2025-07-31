import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleEditorProps } from "@shared/types";
import { RoleGeneralSettings } from "../role-settings/GeneralSettings";
import { RoleMembers } from "../role-settings/RoleMembers";
import { RolePermissions } from "../role-settings/RolePerms";
import { useTranslation } from "@/hooks/useTranslation";
import { Save, Trash } from "lucide-react";

export function RoleEditor({
  role,
  permissionCategories,
  formatDate,
  onUpdateRole,
  onDeleteRole,
  onRemoveUser,
  onRoleNameChange,
  onRoleColorChange,
  onTogglePermission,
}: RoleEditorProps) {
  const translation = useTranslation();
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{translation("Role Settings")}</CardTitle>
        <CardDescription>{translation("Edit role details and permissions")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">{translation("General")}</TabsTrigger>
            <TabsTrigger value="permissions">{translation("Permissions")}</TabsTrigger>
            <TabsTrigger value="members">{translation("Members")}</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <RoleGeneralSettings
              roleName={role.role_name}
              roleColor={role.role_color}
              onRoleNameChange={onRoleNameChange}
              onRoleColorChange={onRoleColorChange}
            />
          </TabsContent>

          <TabsContent value="permissions">
            <RolePermissions
              permissionCategories={permissionCategories}
              activePermissions={role.permissions}
              onTogglePermission={onTogglePermission}
            />
          </TabsContent>

          <TabsContent value="members">
            <RoleMembers
              users={role.users}
              formatDate={formatDate}
              onRemoveUser={(userId) => onRemoveUser(userId)}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onDeleteRole(role.id)}>
          <Trash className="mr-2" size={20} /> {translation("Delete Role")}
        </Button>
        <Button onClick={() => onUpdateRole(role)}>
          <Save className="mr-2" size={20} /> {translation("Save Changes")}
        </Button>
      </CardFooter>
    </Card>
  );
}
