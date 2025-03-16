import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormattedDate } from "@/lib/translation";
import { roles_with_users, UsersTableProps } from "@shared/types";
import { UserProfileCell } from "./UserProfileCell";
import { RoleBadge } from "./RoleBadge";
import { UserAction } from "./UserAction";
import { useUserSelection } from "@/hooks/useUserSelection";
import { useTranslation } from "@/hooks/useTranslation";

export default function UsersTable({
  users,
  roles,
  isLoading,
  onEditUser,
  onManageRoles,
  onRemoveUser,
}: UsersTableProps): JSX.Element {
  const translation = useTranslation();
  const formatLocalizedDate = useFormattedDate();
  const { selectAll, handleSelectAllChange, handleUserCheckboxChange, isUserChecked } =
    useUserSelection(users); // For later use

  const getUserRoles = (userId: string): roles_with_users | null => {
    const userRole = roles.find((role) => role.users.some((userRole) => userRole.id === userId));
    return userRole || null;
  };

  if (isLoading) {
    return <div className="py-8 text-center">{translation("Loading user data")}...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              className="w-6 h-6"
              checked={selectAll}
              onCheckedChange={(checked) => handleSelectAllChange(checked as boolean)}
            />
          </TableHead>
          <TableHead>{translation("User")}</TableHead>
          <TableHead>{translation("Role")}</TableHead>
          <TableHead>{translation("Status")}</TableHead>
          <TableHead>{translation("Join Date")}</TableHead>
          <TableHead>{translation("Actions")}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.length > 0 ? (
          users.map((user) => (
            <TableRow key={user.id} className="">
              <TableCell>
                <Checkbox
                  className="w-6 h-6"
                  checked={isUserChecked(user.id)}
                  onCheckedChange={(checked) =>
                    handleUserCheckboxChange(user.id, checked as boolean)
                  }
                />
              </TableCell>
              <TableCell>
                <UserProfileCell user={user} />
              </TableCell>
              <TableCell>
                <RoleBadge userRole={getUserRoles(user.id)} />
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {/* Fill Data Later */}
                  {translation("Online")}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {formatLocalizedDate(user.created_at)}
                </div>
              </TableCell>
              <TableCell>
                <UserAction
                  user={user}
                  onEditUser={onEditUser}
                  onManageRoles={onManageRoles}
                  onRemoveUser={onRemoveUser}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6">
              {translation("No users found")}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
