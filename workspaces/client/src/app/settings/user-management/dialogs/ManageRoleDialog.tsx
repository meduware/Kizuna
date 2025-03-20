import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ManageRoleDialogProps, Role } from "@shared/types";
import { useTranslation } from "@/hooks/useTranslation";

export default function ManageRoleDialog({
  user,
  userRoles,
  isOpen,
  onClose,
  onAssignRole,
}: ManageRoleDialogProps): JSX.Element {
  const translation = useTranslation();
  if (!user) {
    return <></>;
  }

  const getUserRole = (userId: string): Role | null => {
    const userRole = userRoles.find((role) =>
      role.users.some((userRole) => userRole.id === userId)
    );
    return userRole || null;
  };

  const currentUserRole = getUserRole(user.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{translation("Manage User Roles")}</DialogTitle>
          <DialogDescription>{`${translation("Assign or remove roles for")} ${
            user.username
          }`}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-4">
            {userRoles?.map((role) => {
              const hasRole = currentUserRole?.id === role.id;

              return (
                <div key={role.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: role.role_color }}
                    />
                    <span>{role.role_name}</span>
                  </div>
                  {hasRole ? (
                    <Button variant="default" size="sm" disabled={true}>
                      {translation("Current Role")}
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => onAssignRole(role.id)}>
                      {translation("Assign")}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {translation("Cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
