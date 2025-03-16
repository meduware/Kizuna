"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UsersTable from "./table/UsersTable";
import UserSearchBar from "./table/UserSearchBar";
import EditUserDialog from "./dialogs/EditUserDialog";
import ManageRoleDialog from "./dialogs/ManageRoleDialog";
import { useUsersManagement } from "@/hooks/useUsersManagement";
import { useTranslation } from "@/hooks/useTranslation";

export default function UsersManagement(): JSX.Element {
  const translation = useTranslation();
  const {
    users,
    roles,
    allRoles,
    isLoading,
    searchQuery,
    selectedUser,
    isEditDialogOpen,
    isRoleDialogOpen,
    setSearchQuery,
    setIsEditDialogOpen,
    setIsRoleDialogOpen,
    handleEditUser,
    handleRoleManagement,
    handleSaveUserDetails,
    handleSaveRoles,
    handleRemoveUser,
    handleUsernameChange,
    handleAvatarChange,
    refreshData,
  } = useUsersManagement();
  return (
    <div className="sm:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{translation("Users Management")}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {translation("Manage users, assign roles, and edit user profiles")}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2 max-sm:px-4">
          <div className="flex md:flex-row flex-col gap-2 justify-between items-center">
            <div className="text-start w-full">
              <CardTitle>{translation("Users")}</CardTitle>
              <CardDescription>
                {users.length} {translation("users in this server")}
              </CardDescription>
            </div>
            <UserSearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              refreshData={refreshData}
            />
          </div>
        </CardHeader>
        <CardContent className="max-sm:p-2">
          <UsersTable
            users={users}
            roles={roles}
            isLoading={isLoading}
            onEditUser={handleEditUser}
            onManageRoles={handleRoleManagement}
            onRemoveUser={handleRemoveUser}
          />
        </CardContent>
      </Card>

      <EditUserDialog
        user={selectedUser}
        isOpen={isEditDialogOpen}
        onUsernameChange={handleUsernameChange}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveUserDetails}
        onAvatarChange={handleAvatarChange}
      />

      <ManageRoleDialog
        user={selectedUser}
        roles={allRoles}
        userRoles={roles}
        isOpen={isRoleDialogOpen}
        onClose={() => setIsRoleDialogOpen(false)}
        onAssignRole={handleSaveRoles}
      />
    </div>
  );
}
