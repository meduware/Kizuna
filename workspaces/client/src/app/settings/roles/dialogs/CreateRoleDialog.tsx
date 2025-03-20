import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateRoleDialogProps } from "@shared/types";

export function CreateRoleDialog({ isOpen, onClose, onCreateRole }: CreateRoleDialogProps) {
  const [roleName, setRoleName] = useState("");
  const [roleColor, setRoleColor] = useState("#ea580c");

  const handleCreateRole = async () => {
    const success = await onCreateRole(roleName, roleColor);
    if (success) {
      setRoleName("");
      setRoleColor("#ea580c");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
          <DialogDescription>
            Add a new role to your server with custom permissions
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Role Name
            </label>
            <Input
              id="name"
              placeholder="Enter role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="color" className="text-sm font-medium">
              Role Color
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="color"
                type="color"
                value={roleColor}
                onChange={(e) => setRoleColor(e.target.value)}
                className="w-12 h-8 p-1 rounded"
              />
              <span className="text-sm text-gray-500">{roleColor}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateRole}>Create Role</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
