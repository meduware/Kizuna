import { Role } from "@shared/types";
import { Badge } from "@/components/ui/badge";

export function RoleBadge({ userRole }: { userRole: Role | null }): JSX.Element {
  if (!userRole) {
    return <span className="text-gray-400">No role</span>;
  }

  return (
    <Badge
      variant="outline"
      style={{
        borderColor: userRole.role_color,
        color: userRole.role_color,
      }}
    >
      {userRole.role_name}
    </Badge>
  );
}
