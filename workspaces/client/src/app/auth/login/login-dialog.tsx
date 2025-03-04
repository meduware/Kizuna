import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoginForm } from "@/components/login-form";
import { useState, useEffect } from "react";
import { AuthSettings } from "@shared/types";

interface loginDialog {
  onClose: () => void;
  isOpen: boolean;
}

export default function LoginDialog({ onClose, isOpen }: loginDialog) {
  const [authConfig, setAuthConfig] = useState<AuthSettings>({
    allowAnonymous: true,
    allowGoogleAuth: true,
    allowGitHubAuth: true,
    allowNewAccounts: true,
  }); // Backend data

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-md">
                <LoginForm authConfig={authConfig} />
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
