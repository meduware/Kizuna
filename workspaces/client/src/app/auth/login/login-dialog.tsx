import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoginForm } from "@/components/login-form";
import { useTechnicalSettings } from "@/hooks/useTechnicalDetails";
import { loginDialog } from "@shared/types";

export default function LoginDialog({ onClose, isOpen }: loginDialog) {
  const { settings } = useTechnicalSettings();

  if (!settings) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-md">
                <LoginForm
                  authConfig={settings.technical_details.login_methods}
                  onClose={onClose}
                />
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
