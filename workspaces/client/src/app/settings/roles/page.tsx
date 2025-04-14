"use client";

import React, { useState } from "react";
import { PermissionCategory } from "@shared/types";
import { useFormattedDate } from "@/lib/translation";
import { CreateRoleDialog } from "./dialogs/CreateRoleDialog";
import { RoleList } from "./panels/RoleList";
import { RoleEditor } from "./panels/RoleEditor";
import { EmptyRoleState } from "./panels/EmptyRoleState";
import { useRoleManagement } from "@/hooks/useRoleManagement";
import { useTranslation } from "@/hooks/useTranslation";
import { LoadingSpinner } from "@/components/(settingspage)/LoadingSpinner";

export default function RoleManagement() {
  const formatLocalizedDate = useFormattedDate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const translation = useTranslation();

  const {
    roles,
    loading,
    activeRole,
    setActiveRole,
    createRole,
    deleteRole,
    updateRole,
    removeUserFromRole,
    updateActiveRole,
    togglePermission,
  } = useRoleManagement();

  if (loading) {
    return <LoadingSpinner message="Loading Roles" />;
  }

  const permCategories: PermissionCategory[] = [
    {
      name: "General Server Permissions",
      permissions: [
        { id: "owner", label: "Owner" },
        { id: "manage_server", label: "Manage Server" },
        { id: "manage_users", label: "Manage Users" },
      ],
    },
  ];

  return (
    <div className="h-full">
      <div className="md:p-4 py-6 overflow-y-auto h-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {translation("Role Management")}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {translation("Create and manage roles and permissions for your server")}
            </p>
          </div>
        </div>

        <CreateRoleDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onCreateRole={createRole}
        />

        <div className="flex lg:flex-row flex-col gap-6 h-5/6">
          <RoleList
            roles={roles}
            activeRole={activeRole}
            onRoleSelect={setActiveRole}
            onCreateRoleClick={() => setIsCreateDialogOpen(true)}
          />

          {activeRole ? (
            <RoleEditor
              role={activeRole}
              permissionCategories={permCategories}
              formatDate={formatLocalizedDate}
              onUpdateRole={updateRole}
              onDeleteRole={deleteRole}
              onRemoveUser={(userId) => removeUserFromRole(userId, activeRole.id)}
              onRoleNameChange={(name) => updateActiveRole({ role_name: name })}
              onRoleColorChange={(color) => updateActiveRole({ role_color: color })}
              onTogglePermission={togglePermission}
            />
          ) : (
            <EmptyRoleState onCreateClick={() => setIsCreateDialogOpen(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
