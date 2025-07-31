import { User } from "@shared/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface UserActionProps {
  user: User;
  onEditUser: (user: User) => void;
  onManageRoles: (user: User) => void;
  onRemoveUser: (userId: string) => void;
}

export function UserAction({
  user,
  onEditUser,
  onManageRoles,
  onRemoveUser,
}: UserActionProps): JSX.Element {
  const translation = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEditUser(user)}>
          {translation("Edit Profile")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onManageRoles(user)}>
          {translation("Manage Roles")}
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onClick={() => onRemoveUser(user.id)}>
          {translation("Remove User")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
