import { User } from "@shared/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RoleMembersProps } from "@shared/types";

export function RoleMembers({ users, onRemoveUser, formatDate }: RoleMembersProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length > 0 ? (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="flex items-center gap-2">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.photo_url} />
                    <AvatarFallback>{user.username.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.username}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{formatDate(user.created_at)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => onRemoveUser(user.id)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center py-4 text-gray-500">
              No members with this role
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
