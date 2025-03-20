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
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Role Settings</CardTitle>
        <CardDescription>Edit role details and permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
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
          Delete Role
        </Button>
        <Button onClick={() => onUpdateRole(role)}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
