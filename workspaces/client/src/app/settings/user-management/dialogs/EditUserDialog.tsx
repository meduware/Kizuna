import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditUserDialogProps } from "@shared/types";
import { useTranslation } from "@/hooks/useTranslation";

export default function EditUserDialog({
  user,
  isOpen,
  onUsernameChange,
  onClose,
  onSave,
  onAvatarChange,
}: EditUserDialogProps): JSX.Element {
  const translation = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!user) {
    return <></>;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      onAvatarChange(file);
    } catch (error) {
      console.error("Error handling avatar change:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{translation("Edit User Profile")}</DialogTitle>
          <DialogDescription>
            {translation("Update user details and profile information")}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
              <AvatarImage src={user.photo_url} />
              <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button variant="outline" size="sm" onClick={handleAvatarClick} disabled={isUploading}>
              {isUploading ? `${translation("Processing")}...` : `${translation("Change Avatar")}`}
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">{translation("Display Name")}</Label>
            <Input
              id="name"
              value={user.username}
              onChange={(e) => {
                onUsernameChange(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row max-sm:gap-2">
          <Button variant="outline" onClick={onClose}>
            {translation("Cancel")}
          </Button>
          <Button onClick={onSave} disabled={isUploading}>
            {translation("Save Changes")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
