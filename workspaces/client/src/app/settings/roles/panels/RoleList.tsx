import { PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { RoleListProps } from "@shared/types";

export function RoleList({
  roles,
  activeRole,
  onRoleSelect,
  onCreateRoleClick,
}: RoleListProps) {
  return (
    <Card className="lg:w-1/4 md:min-w-[300px] h-2/3 lg:h-full">
      <ScrollArea className="h-full">
        <CardHeader className="sm:px-4">
          <CardTitle>Roles</CardTitle>
          <CardDescription>
            Select a role to edit its permissions or create one!
          </CardDescription>
          <div className="w-full pt-4">
            <Button className="gap-2 w-full" onClick={onCreateRoleClick}>
              <PlusCircle size={16} />
              Create Role
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 h-full sm:px-4">
          {roles
            .slice()
            .sort((a, b) => a.index - b.index)
            .map((role) => (
              <div
                key={role.id}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border ${
                  activeRole?.id === role.id
                    ? "border-primary"
                    : "border hover:bg-secondary"
                }`}
                onClick={() => onRoleSelect(role)}
              >
                <div className="flex relative items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full absolute"
                    style={{ backgroundColor: role.role_color }}
                  ></div>
                  <span className="font-medium pl-6">{role.role_name}</span>
                </div>
                <Badge className="truncate" variant="outline">
                  {role.users.length} users
                </Badge>
              </div>
            ))}
        </CardContent>
        <ScrollBar />
      </ScrollArea>
    </Card>
  );
}
